#!/usr/bin/env bash
set -euo pipefail

BASE_DIR='src/assets/posts'
OUT='sitemap.xml'
SITE='https://janladicha.de'
TMP="$(mktemp)"

# XML header
cat > "$TMP" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
EOF

# add root entry with execution date as lastmod (UTC)
main_lastmod="$(date -u +%Y-%m-%d)"
printf "  <url>\n" >> "$TMP"
printf "    <loc>%s/</loc>\n" "$SITE" >> "$TMP"
printf "    <priority>1.0</priority>\n" >> "$TMP"
printf "    <lastmod>%s</lastmod>\n" "$main_lastmod" >> "$TMP"
printf "  </url>\n" >> "$TMP"

# iterate markdown files, skip drafts
find "$BASE_DIR" -type f -name '*.md' -not -path "*/drafts/*" | while IFS= read -r file; do
  # relative path -> url (remove base dir and .md)
  rel="${file#"$BASE_DIR"/}"
  # build URL from BASE_DIR name and the .md file's subdirectory
  dir_name="$(basename "$BASE_DIR")"              # e.g. "posts"
  base="$(basename "$rel" .md)"                   # filename without .md
  parent="$(dirname "$rel")"                      # subdir relative to BASE_DIR, or "."

  url="https://janladicha.de/${parent}"

  # read second line, strip leading 'date:' if present
  second_line="$(sed -n '2p' "$file" | sed -E 's/^[[:space:]]*date:?[[:space:]]*//I' | tr -d '\r')"

  lastmod=""
  if [[ $second_line =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2} ]]; then
    lastmod="${BASH_REMATCH[0]}"
  else
    # try git last commit date (ISO8601)
    if git -C . rev-parse --is-inside-work-tree >/dev/null 2>&1; then
      gitdate="$(git -C . log -1 --format=%cI -- "$file" 2>/dev/null || true)"
      if [[ -n "$gitdate" ]]; then
        # git returns full ISO; take date part
        lastmod="${gitdate%%T*}"
      fi
    fi
    # fallback to file mtime (macOS-compatible)
    if [[ -z "$lastmod" ]]; then
      lastmod="$(stat -f "%Sm" -t "%Y-%m-%d" "$file" 2>/dev/null || true)"
    fi
  fi

  # write url entry
  printf "  <url>\n" >> "$TMP"
  printf "    <loc>%s</loc>\n" "$url" >> "$TMP"
  if [[ -n "$lastmod" ]]; then
    printf "    <lastmod>%s</lastmod>\n" "$lastmod" >> "$TMP"
  fi
  printf "  </url>\n" >> "$TMP"
done

# close and move
printf "</urlset>\n" >> "$TMP"
mv "$TMP" "$OUT"
echo "Sitemap written to `pwd`/$OUT"
