#!/usr/bin/env bash
set -euo pipefail

"$(cd "$(dirname "$0")" && pwd)/build-kernel.sh"
"$(cd "$(dirname "$0")" && pwd)/build-servers.sh"
"$(cd "$(dirname "$0")" && pwd)/build-apps.sh"
