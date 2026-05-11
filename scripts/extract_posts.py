#!/usr/bin/env python3
import os
import sys
import re
import yaml
import pymysql
from urllib.parse import unquote
from pathlib import Path
from datetime import datetime, timezone, timedelta

DB = dict(
    host="127.0.0.1",
    port=33306,
    user="wordpress",
    password="localdev",
    database="knightzone_wordpress",
    charset="utf8mb4",
)

OUT_ROOT = Path(__file__).resolve().parent.parent / "src" / "content"
POSTS_DIR = OUT_ROOT / "posts"
PAGES_DIR = OUT_ROOT / "pages"

TAIPEI = timezone(timedelta(hours=8))

WANTED_TYPES = ("post", "page")
WANTED_STATUSES = ("publish", "private", "draft")


def slugify_filename(s: str) -> str:
    s = unquote(s)
    s = re.sub(r"[\\/:*?\"<>|]", "_", s)
    s = s.strip().strip(".") or "untitled"
    return s[:80]


def fetch_terms(cur, post_ids):
    if not post_ids:
        return {}
    placeholders = ",".join(["%s"] * len(post_ids))
    cur.execute(
        f"""
        SELECT tr.object_id, tt.taxonomy, t.name, t.slug
        FROM wp_term_relationships tr
        JOIN wp_term_taxonomy tt ON tt.term_taxonomy_id = tr.term_taxonomy_id
        JOIN wp_terms t ON t.term_id = tt.term_id
        WHERE tr.object_id IN ({placeholders})
          AND tt.taxonomy IN ('category', 'post_tag')
        """,
        post_ids,
    )
    grouped: dict[int, dict[str, list[str]]] = {}
    for r in cur.fetchall():
        bucket = grouped.setdefault(r["object_id"], {"categories": [], "tags": []})
        if r["taxonomy"] == "category":
            bucket["categories"].append(r["name"])
        elif r["taxonomy"] == "post_tag":
            bucket["tags"].append(r["name"])
    return grouped


def fetch_post_meta(cur, post_ids, keys):
    if not post_ids:
        return {}
    id_ph = ",".join(["%s"] * len(post_ids))
    key_ph = ",".join(["%s"] * len(keys))
    cur.execute(
        f"""
        SELECT post_id, meta_key, meta_value
        FROM wp_postmeta
        WHERE post_id IN ({id_ph}) AND meta_key IN ({key_ph})
        """,
        list(post_ids) + list(keys),
    )
    out: dict[int, dict[str, str]] = {}
    for r in cur.fetchall():
        out.setdefault(r["post_id"], {})[r["meta_key"]] = r["meta_value"]
    return out


def fetch_attachment_urls(cur, ids):
    if not ids:
        return {}
    ph = ",".join(["%s"] * len(ids))
    cur.execute(
        f"SELECT ID, guid FROM wp_posts WHERE ID IN ({ph})", list(ids)
    )
    return {r["ID"]: r["guid"] for r in cur.fetchall()}


def to_taipei(dt: datetime) -> str:
    if dt is None:
        return ""
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=TAIPEI)
    return dt.isoformat()


def write_post(row, terms, meta, featured_url):
    post_id = row["ID"]
    title = row["post_title"] or f"untitled-{post_id}"
    slug_raw = row["post_name"] or str(post_id)
    slug = unquote(slug_raw)
    date = row["post_date"]
    modified = row["post_modified"]
    content = row["post_content"] or ""
    status = row["post_status"]
    ptype = row["post_type"]

    frontmatter = {
        "id": post_id,
        "title": title,
        "slug": slug,
        "date": to_taipei(date),
        "lastmod": to_taipei(modified) if modified and modified != date else None,
        "draft": status != "publish",
        "private": status == "private",
        "categories": terms.get("categories") or None,
        "tags": terms.get("tags") or None,
        "excerpt": (row["post_excerpt"] or "").strip() or None,
        "featured_image": featured_url,
        "permalink": (
            f"/{date.strftime('%Y/%m/%d')}/{post_id}/{slug_raw}/"
            if ptype == "post" and date
            else None
        ),
        "wp_status": status,
        "wp_type": ptype,
    }
    frontmatter = {k: v for k, v in frontmatter.items() if v not in (None, "", [], {})}

    if ptype == "page":
        out_dir = PAGES_DIR
        fname = f"{post_id}-{slugify_filename(slug)}.md"
    else:
        out_dir = POSTS_DIR / f"{date.year:04d}" if date else POSTS_DIR / "unknown"
        fname = f"{post_id}-{slugify_filename(slug)}.md"

    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / fname

    yaml_str = yaml.safe_dump(
        frontmatter, allow_unicode=True, sort_keys=False, default_flow_style=False
    )
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("---\n")
        f.write(yaml_str)
        f.write("---\n\n")
        f.write(content)
        if not content.endswith("\n"):
            f.write("\n")

    return out_path


def main():
    conn = pymysql.connect(**DB, cursorclass=pymysql.cursors.DictCursor)
    try:
        with conn.cursor() as cur:
            type_ph = ",".join(["%s"] * len(WANTED_TYPES))
            status_ph = ",".join(["%s"] * len(WANTED_STATUSES))
            cur.execute(
                f"""
                SELECT ID, post_title, post_name, post_date, post_modified,
                       post_content, post_excerpt, post_status, post_type
                FROM wp_posts
                WHERE post_type IN ({type_ph}) AND post_status IN ({status_ph})
                ORDER BY post_date
                """,
                list(WANTED_TYPES) + list(WANTED_STATUSES),
            )
            rows = cur.fetchall()

            post_ids = [r["ID"] for r in rows]
            terms_by_post = fetch_terms(cur, post_ids)
            meta_by_post = fetch_post_meta(cur, post_ids, ["_thumbnail_id"])
            thumb_ids = {
                int(m["_thumbnail_id"])
                for m in meta_by_post.values()
                if m.get("_thumbnail_id", "").isdigit()
            }
            attach_urls = fetch_attachment_urls(cur, thumb_ids)

        counts = {"post": 0, "page": 0}
        for row in rows:
            terms = terms_by_post.get(row["ID"], {})
            meta = meta_by_post.get(row["ID"], {})
            thumb_id = meta.get("_thumbnail_id")
            featured = attach_urls.get(int(thumb_id)) if (thumb_id or "").isdigit() else None
            write_post(row, terms, meta, featured)
            counts[row["post_type"]] += 1

        print(f"Wrote {counts['post']} posts and {counts['page']} pages to {OUT_ROOT}")
    finally:
        conn.close()


if __name__ == "__main__":
    main()
