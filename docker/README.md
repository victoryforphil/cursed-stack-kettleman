# Docker Configuration and CI/CD

This directory contains Docker configurations for the Cursed Stack Kettleman project.

## Directory Structure

```
docker/
├── compose-full/             # Full Docker Compose setup
│   ├── docker-compose.yml    # Compose file for all services
│   └── moon.yml              # Moon configuration for Docker Compose
```

## Docker Compose

The docker-compose.yml file in the compose-full directory provides a complete development environment with all required services:

- cursed-web: Frontend React application
- cursed-server: Backend Bun/Prisma API
- postgres: PostgreSQL database
- influxdb: InfluxDB time series database
- Additional monitoring services (OpenTelemetry, ClickHouse, SigNoz)

### Running Docker Compose

```bash
# Run the full stack with all services
moon run compose-full:up

# Shut down all services
moon run compose-full:down
```

## Container Images

Each component of the stack has its own Dockerfile for containerization:

- cursed-web: Frontend React application
- cursed-server: Backend Bun/Prisma API
- cursed-devcontainer: Development container with all tools pre-installed

### Building Container Images

```bash
# Build server container
moon run cursed-server:docker-build

# Build web container
moon run cursed-web:docker-build
```

## CI/CD Workflows

GitHub Actions workflows automate the build, test, and deployment processes.

### Available Workflows

#### CI (ci.yml)
- Triggered on pushes to main and pull requests
- Runs tests and builds for all projects
- Uses Proto and Moon for toolchain management

#### Docker Compose (docker-compose.yml)
- Triggered on pushes to main and pull requests
- Builds all projects and runs Docker Compose builds
- Uses the tag 'docker-compose' to identify relevant tasks

#### Docker Build & Publish (docker-build.yml)
- Triggered on pushes to main and tag pushes (v*)
- Builds and publishes Docker images for both server and web
- Publishes to GitHub Container Registry (ghcr.io)
- Tags images with version and 'latest'

#### Dev Container (devcontainer.yml)
- Triggered on pushes to main when .devcontainer files change
- Builds and publishes the development container
- Publishes to GitHub Container Registry (ghcr.io)

#### Code Coverage (coverage.yml)
- Triggered on pushes to main and pull requests
- Generates code coverage reports for server and web
- Uploads coverage reports to Codecov

### Image Tagging Strategy

Container images are tagged using:
- Short commit SHA for every push
- Semantic version for tagged releases (v1.2.3)
- Major.minor version for tagged releases (v1.2)
- 'latest' for the most recent build from main

### Required Secrets

- `GITHUB_TOKEN`: Automatically provided by GitHub
- `CODECOV_TOKEN`: Required for uploading coverage to Codecov
``` 