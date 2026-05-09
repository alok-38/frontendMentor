#!/usr/bin/env bash

OUTPUT_DIR="converted"
mkdir -p "$OUTPUT_DIR"

for font in *.ttf; do
  [ -e "$font" ] || continue  # skip if no matches

  name="${font%.*}"

  echo "Converting $font..."

  # WOFF
  ttx -o "$OUTPUT_DIR/$name.woff" --flavor woff "$font"

  # WOFF2
  woff2_compress "$font"
  mv "$name.woff2" "$OUTPUT_DIR/"
done

echo "All fonts converted!"
