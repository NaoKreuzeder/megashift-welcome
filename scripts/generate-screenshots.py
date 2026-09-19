#!/usr/bin/env python3
"""Create native-resolution, lossless UI crops from the supplied store artwork.

Generate: python scripts/generate-screenshots.py /path/to/android
Verify:   python scripts/generate-screenshots.py --check
Regenerate one locale (keeps the others):
          python scripts/generate-screenshots.py /path/to/android --locale bn
Verify against originals too:
          python scripts/generate-screenshots.py /path/to/android --check

Requires Pillow (see requirements-screenshots.txt). No OCR, upscaling, sharpening,
AI synthesis, palette reduction, chroma subsampling or lossy recompression.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import sys
from pathlib import Path

from PIL import Image, __version__ as pillow_version, features

ROOT = Path(__file__).resolve().parents[1]
CONFIG_PATH = ROOT / "scripts/screenshot-crops.json"
MANIFEST_PATH = ROOT / "scripts/screenshot-manifest.json"


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def source_path(source: Path, config: dict, slug: str, view: str) -> Path:
    filename = config.get("sourceOverrides", {}).get(slug, {}).get(view, config["views"][view]["source"])
    return source / config["locales"][slug] / config["sourceSubdirectory"] / filename


def read_crop(path: Path, config: dict, view: str) -> Image.Image:
    with Image.open(path) as image:
        if image.size != tuple(config["sourceSize"]):
            raise ValueError(f"Unexpected source dimensions: {path}: {image.size}")
        if image.mode not in ("RGB", "RGBA"):
            raise ValueError(f"Unexpected source color mode: {path}: {image.mode}")
        # The source artwork is opaque; preserve the RGB pixels exactly.
        if image.mode == "RGBA" and image.getextrema()[3] != (255, 255):
            raise ValueError(f"Source is not opaque: {path}")
        return image.convert("RGB").crop(tuple(config["views"][view]["crop"]))


def verify(config: dict, source: Path | None) -> None:
    manifest = load_json(MANIFEST_PATH)
    expected = {f"public/images/screenshots/{slug}/{view}.webp"
                for slug in config["locales"] for view in config["views"]}
    actual = {str(path.relative_to(ROOT)) for path in (ROOT / "public/images/screenshots").rglob("*.webp")}
    if actual != expected or set(manifest["assets"]) != expected:
        raise ValueError("Missing, unexpected or unrecorded screenshot assets")
    for relative, record in manifest["assets"].items():
        path = ROOT / relative
        if digest(path.read_bytes()) != record["sha256"]:
            raise ValueError(f"File hash mismatch: {relative}")
        with Image.open(path) as image:
            if image.format != "WEBP" or image.size != tuple(record["size"]):
                raise ValueError(f"Wrong image format/dimensions: {relative}")
            rgb = image.convert("RGB")
            if digest(rgb.tobytes()) != record["pixelSha256"]:
                raise ValueError(f"Decoded pixel mismatch: {relative}")
            if source is not None:
                original = source_path(source, config, record["locale"], record["view"])
                if digest(original.read_bytes()) != record["sourceSha256"]:
                    raise ValueError(f"Original source changed: {original}")
                crop = read_crop(original, config, record["view"])
                if rgb.size != crop.size or rgb.tobytes() != crop.tobytes():
                    raise ValueError(f"Lossless crop verification failed: {relative}")
    suffix = "; every decoded pixel matches its original PNG crop" if source else ""
    print(f"PASS: {len(expected)} WebP assets, dimensions and SHA-256 hashes{suffix}.")


def generate(config: dict, source: Path, selected: str | None = None) -> None:
    locales = [selected] if selected else list(config["locales"])
    if selected and selected not in config["locales"]:
        raise ValueError(f"Unknown locale: {selected}")
    if selected and not MANIFEST_PATH.is_file():
        raise ValueError("Generate the complete asset set before regenerating one locale")
    # Check every input before producing output: a missing locale is an error,
    # never a silent English substitute.
    for slug in locales:
        for view in config["views"]:
            path = source_path(source, config, slug, view)
            if not path.is_file():
                raise FileNotFoundError(path)

    manifest = {
        "version": 1,
        "encoding": "lossless WebP; native crop; no resize",
        "generator": {"pillow": pillow_version, "libwebp": features.version("webp"), "method": 6},
        "assets": {},
    }
    if selected:
        existing = load_json(MANIFEST_PATH)
        if existing["generator"] != manifest["generator"]:
            raise ValueError("Encoder version changed; regenerate all assets instead")
        manifest["assets"] = existing["assets"]
    for slug in locales:
        for view, settings in config["views"].items():
            original = source_path(source, config, slug, view)
            crop = read_crop(original, config, view)
            relative = f"public/images/screenshots/{slug}/{view}.webp"
            output = ROOT / relative
            output.parent.mkdir(parents=True, exist_ok=True)
            temporary = output.with_suffix(".webp.tmp")
            crop.save(temporary, format="WEBP", lossless=True, method=6, exact=True)
            # Validate the encoder result before installing the asset.
            with Image.open(temporary) as encoded:
                if encoded.convert("RGB").tobytes() != crop.tobytes():
                    temporary.unlink(missing_ok=True)
                    raise ValueError(f"Encoder changed pixels: {relative}")
            temporary.replace(output)
            manifest["assets"][relative] = {
                "locale": slug, "view": view,
                "source": str(original.relative_to(source)),
                "sourceSha256": digest(original.read_bytes()),
                "crop": settings["crop"], "size": list(crop.size),
                "bytes": output.stat().st_size,
                "sha256": digest(output.read_bytes()),
                "pixelSha256": digest(crop.tobytes()),
            }
        print(f"Created {slug}: {len(config['views'])} lossless assets", flush=True)

    MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    metadata = {}
    for view, settings in config["views"].items():
        left, top, right, bottom = settings["crop"]
        metadata[view] = {"width": right - left, "height": bottom - top,
                          "layoutWidth": settings["layout"][0], "layoutHeight": settings["layout"][1]}
    generated = "// Generated by scripts/generate-screenshots.py. Do not edit by hand.\n"
    generated += "export const screenshotLocales = Object.freeze(" + json.dumps(list(config["locales"]), ensure_ascii=False) + ");\n\n"
    generated += "export const screenshotViews = Object.freeze(" + json.dumps(metadata, indent=2) + ");\n"
    (ROOT / "lib/screenshot-assets.mjs").write_text(generated, encoding="utf-8")
    verify(config, None)
    total = sum(record["bytes"] for record in manifest["assets"].values())
    print(f"Total: {len(manifest['assets'])} files, {total / 1024 / 1024:.2f} MiB")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("source", nargs="?", type=Path, help="Extracted android directory")
    parser.add_argument("--check", action="store_true", help="Verify existing assets without changing files")
    parser.add_argument("--locale", help="Regenerate only this locale; requires an existing complete manifest")
    args = parser.parse_args()
    if not features.check("webp"):
        parser.error("This Pillow installation does not support WebP")
    if args.check and args.locale:
        parser.error("--check always verifies every locale; omit --locale")
    if not args.check and args.source is None:
        parser.error("Provide the source directory, or use --check")
    try:
        config = load_json(CONFIG_PATH)
        if args.check:
            verify(config, args.source)
        else:
            generate(config, args.source, args.locale)
    except (OSError, ValueError, KeyError) as error:
        print(f"ERROR: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
