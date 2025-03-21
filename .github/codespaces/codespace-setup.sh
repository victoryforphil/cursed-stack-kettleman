#!/bin/bash

# Exit on error
set -e

echo "🚀 Setting up Codespace environment..."

# Install Proto from moonrepo
echo "📦 Installing Proto..."
curl -fsSL https://moonrepo.dev/install/proto.sh | bash

# Add Proto to PATH
export PATH="/home/node/.proto/bin:$PATH"

# Install Bun and Moon using Proto
echo "🌙 Installing Bun and Moon using Proto..."
proto install bun@latest
proto install moon
proto bin-install moon
proto bin-install bun

# Install dependencies
echo "📦 Installing project dependencies..."
moon run :install

echo "✅ Codespace setup complete!" 