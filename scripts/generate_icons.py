"""Regenerate favicons from public/favicon-tab-source.png (FH monogram)."""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
TAB_SOURCE = PUBLIC / "favicon-tab-source.png"


def resize_icon(source: Image.Image, size: int) -> Image.Image:
    return source.resize((size, size), Image.Resampling.LANCZOS)


def main() -> None:
    if not TAB_SOURCE.exists():
        raise SystemExit(f"Missing tab icon source: {TAB_SOURCE}")

    source = Image.open(TAB_SOURCE).convert("RGBA")
    outputs = {
        "favicon.png": 512,
        "apple-touch-icon.png": 180,
        "favicon-32.png": 32,
        "favicon-16.png": 16,
    }
    for name, size in outputs.items():
        resize_icon(source, size).save(PUBLIC / name, format="PNG", optimize=True)
        print(f"Wrote {name} ({size}x{size})")


if __name__ == "__main__":
    main()
