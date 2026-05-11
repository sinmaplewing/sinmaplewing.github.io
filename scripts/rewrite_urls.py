#!/usr/bin/env python3
"""Rewrite knightzone.studio URLs in extracted Markdown content to local paths.

- https://knightzone.studio/wp-content/uploads/...  -> /uploads/...
- http(s)://knightzone.studio/                       -> /
Idempotent: safe to run multiple times.
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "src" / "content"

PATTERNS = [
    (re.compile(r"https?://(?:www\.)?knightzone\.studio/wp-content/uploads/"), "/uploads/"),
    (re.compile(r"https?://(?:www\.)?knightzone\.studio/"), "/"),
    # Collapse WordPress-generated thumbnail variants (foo-300x200.png -> foo.png)
    (re.compile(r"(/uploads/[^\s\"')]+?)-\d+x\d+(\.(?:png|jpg|jpeg|gif))"), r"\1\2"),
]


def rewrite(text: str) -> tuple[str, int]:
    n = 0
    for pat, repl in PATTERNS:
        text, k = pat.subn(repl, text)
        n += k
    return text, n


def main():
    total_files = 0
    total_subs = 0
    affected_files = 0
    for md in CONTENT.rglob("*.md"):
        src = md.read_text(encoding="utf-8")
        out, k = rewrite(src)
        total_files += 1
        if k:
            md.write_text(out, encoding="utf-8")
            affected_files += 1
            total_subs += k
    print(f"Processed {total_files} files; rewrote {total_subs} URLs in {affected_files} files")


if __name__ == "__main__":
    main()
