#!/usr/bin/env bash
# Build locally and publish dist/ to the gh-pages branch.
set -euo pipefail

cd "$(dirname "$0")/.."
ROOT=$(pwd)

git rev-parse --git-dir >/dev/null 2>&1 || { echo "not a git repository"; exit 1; }
git rev-parse --verify HEAD >/dev/null 2>&1 || {
  echo "ERROR: no commits yet — commit the source before publishing it."; exit 1; }
REMOTE=$(git remote get-url origin 2>/dev/null) || { echo "no 'origin' remote set"; exit 1; }

if [ -n "$(git status --porcelain)" ]; then
  if [ "${ALLOW_DIRTY:-}" = "1" ]; then
    echo "warning: ALLOW_DIRTY=1 — publishing HEAD, so uncommitted changes are NOT included"
  else
    echo "ERROR: working tree has uncommitted changes."
    git status --short
    echo
    echo "       Commit them, or re-run with ALLOW_DIRTY=1 to publish HEAD as-is."
    exit 1
  fi
fi

STRAY=$(find public -type f \
          ! -path 'public/duckdb-ext/*' ! -name '.DS_Store' 2>/dev/null || true)
if [ -n "$STRAY" ]; then
  echo "ERROR: unexpected files in public/ — Vite copies these VERBATIM into"
  echo "       dist/ and they WOULD be served from your origin:"
  echo "$STRAY" | sed 's/^/         /'
  echo "       Remove them (or move them into the build) and re-run."
  exit 1
fi

SRC=$(git rev-parse --short HEAD)

BUILD=$(mktemp -d)
TMP=$(mktemp -d)
trap 'rm -rf "$BUILD" "$TMP"' EXIT

echo "exporting ${SRC}…"
git archive HEAD | tar -x -C "$BUILD"

if [ ! -f "$BUILD/package-lock.json" ]; then
  echo "ERROR: package-lock.json is not committed."
  echo "       Run 'npm install' once, commit the lockfile, then use 'npm ci'."
  exit 1
fi
[ -d node_modules ] || { echo "ERROR: no node_modules — run 'npm ci' first."; exit 1; }
ln -s "$ROOT/node_modules" "$BUILD/node_modules"

if [ ! -d public/duckdb-ext ]; then
  echo "ERROR: public/duckdb-ext is missing — run 'npm install' to vendor the"
  echo "       DuckDB extensions, or conversions will fail on the live site."
  exit 1
fi
mkdir -p "$BUILD/public"
cp -R public/duckdb-ext "$BUILD/public/"

echo "building…"
( cd "$BUILD" && npm run build )

[ -d "$BUILD/dist/duckdb-ext" ] || {
  echo "ERROR: dist/duckdb-ext is missing after the build."; exit 1; }

cp -R "$BUILD/dist/." "$TMP/"

# The site redistributes MIT-licensed code (three.js, DuckDB) and the
# public-domain assets, so the license + notices must ship with it.
for f in LICENSE THIRD_PARTY_NOTICES.md; do
  [ -f "$BUILD/$f" ] || {
    echo "ERROR: $f is not committed — it must be published with the site."; exit 1; }
  # Pages serves extension-less files as application/octet-stream, so the
  # browser would download LICENSE instead of showing it: publish it as .txt.
  case "$f" in LICENSE) cp "$BUILD/$f" "$TMP/LICENSE.txt" ;; *) cp "$BUILD/$f" "$TMP/" ;; esac
done

touch "$TMP/.nojekyll"

echo
echo "about to publish:"
( cd "$TMP" && find . -type f | sed 's/^\./         /' | sort )
echo

cd "$TMP"
git init -q -b gh-pages
git add -A
git -c user.name=deploy -c user.email=deploy@localhost commit -qm "deploy ${SRC}"
echo "pushing to gh-pages…"
git push -f -q "$REMOTE" gh-pages

echo "done — deployed ${SRC}"
