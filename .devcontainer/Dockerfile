FROM node:20-bookworm

# Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive

# Install basic development tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    make \
    unzip \
    ca-certificates \
    gnupg \
    lsb-release \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Setup for Docker CLI
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null \
    && apt-get update \
    && apt-get install -y docker-ce-cli \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Switch to the node user
USER node
WORKDIR /home/node

# Install Proto globally (https://moonrepo.dev/proto)
RUN curl -fsSL https://moonrepo.dev/install/proto.sh | bash

# Add Proto to PATH
ENV PATH="/home/node/.proto/bin:${PATH}"

# Install Bun and Moon using Proto
RUN proto install bun@latest && \
    proto install moon && \
    proto bin-install moon && \
    proto bin-install bun

# Set up development environment
WORKDIR /workspaces/cursed-stack-kettleman

# Switch back to dialog mode
ENV DEBIAN_FRONTEND=dialog 