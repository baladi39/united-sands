#!/usr/bin/env bash
set -euo pipefail

# Package the repo into a deployable zip for Hostinger while excluding local build/output artifacts.
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DATE_STR="$(date +%Y%m%d-%H%M%S)"
OUT_ZIP="${1:-deployment-hostinger-${DATE_STR}.zip}"
STAGE_DIR="$(mktemp -d "${TMPDIR:-/tmp}/hostinger-package.XXXXXX")"

cleanup() {
  rm -rf "$STAGE_DIR"
}
trap cleanup EXIT

EXCLUDES=(
  ".git"
  "node_modules"
  ".next"
  "out"
  "build"
  ".vercel"
  "coverage"
  ".DS_Store"
  "*.log"
  "*.tsbuildinfo"
  "*.pem"
  ".pnp"
  ".pnp.*"
)

RSYNC_FLAGS=()
for pattern in "${EXCLUDES[@]}"; do
  RSYNC_FLAGS+=("--exclude=$pattern")
done

rsync -a "${RSYNC_FLAGS[@]}" "$ROOT/" "$STAGE_DIR/"

(
  cd "$STAGE_DIR"
  zip -r "$OUT_ZIP" .
)

mv "$STAGE_DIR/$OUT_ZIP" "$ROOT/$OUT_ZIP"
echo "Created $OUT_ZIP"
echo "Upload the zip to Hostinger, then run npm install (or pnpm install) followed by npm run build on the server."
