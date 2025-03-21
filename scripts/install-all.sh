#!/bin/bash

# Exit on error
set -e

echo "🌙 Installing dependencies across the workspace..."

# Use moon to install all dependencies
#echo "📦 Installing dependencies with moon..."
#moon :install

# Generate Prisma client if needed
if [ -d "cursed-server/prisma" ]; then
  echo "🔄 Generating Prisma client..."
  cd cursed-server
  bunx prisma generate
  cd ..
fi

echo "✅ All dependencies installed successfully!" 