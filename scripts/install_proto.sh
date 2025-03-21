#! /bin/bash

# Install proto in headless mode (non-interactive)
# This avoids interactive prompts and shell profile modifications
# See: https://moonrepo.dev/docs/proto/install
bash <(curl -fsSL https://moonrepo.dev/install/proto.sh) --yes --no-profile
