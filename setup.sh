#!/bin/bash
# Replace https://webhook.site/9b278ba7-478e-4d91-aeac-e4207fa53293 with your actual collaborator/listener domain
# Usage: ./setup.sh your-collab-domain.oastify.com

if [ -z "$1" ]; then
  echo "Usage: $0 <your-domain>"
  echo "Example: $0 abc123.oastify.com"
  echo "Example: $0 mert.interact.sh"
  exit 1
fi

DOMAIN="$1"

# Replace in all files except this script and .git
find . -type f \
  ! -path "./.git/*" \
  ! -name "setup.sh" \
  -exec sed -i "s|ATTACKER\.COM|$DOMAIN|g" {} \;

echo "[+] Replaced https://webhook.site/9b278ba7-478e-4d91-aeac-e4207fa53293 with $DOMAIN in all files"
echo "[+] Now: git add -A && git commit -m 'init' && git push"
