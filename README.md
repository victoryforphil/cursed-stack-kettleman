# cursed-stack-kettleman

A modern full-stack application built with cutting-edge technologies.

## Stack Components

### Frontend (cursed-web)
- React
- Bun
- Mantine UI
- Vite

### Backend (cursed-server)
- Bun
- Prisma
- PostgreSQL
- InfluxDB

## Development Setup

### Using Devcontainer (Recommended)

This project includes a devcontainer configuration for Visual Studio Code and GitHub Codespaces. This provides a consistent development environment with all required dependencies pre-installed.

To use the devcontainer:

1. Install [VS Code](https://code.visualstudio.com/) and the [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension.
2. Clone the repository and open it in VS Code.
3. Click the notification to reopen the project in a container, or use the command palette (`F1`) and select "Remote-Containers: Reopen in Container".

### Using GitHub Codespaces

1. Go to the GitHub repository.
2. Click on the "Code" button.
3. Select the "Codespaces" tab.
4. Click "Create codespace on main".

### Manual Setup

If you prefer to set up manually:

1. Install [Proto](https://moonrepo.dev/proto) for tool management:
   ```bash
   curl -fsSL https://moonrepo.dev/install/proto.sh | bash
   ```

2. Install required tools:
   ```bash
   proto install bun
   proto install moon
   proto bin-install moon
   proto bin-install bun
   ```

3. Install dependencies:
   ```bash
   moon run :install
   ```

## Project Structure

```
cursed-stack-kettleman/
├── cursed-server/     # Backend server
├── cursed-web/        # Frontend application
├── docker/            # Docker configurations
├── scripts/          # Utility scripts
├── .github/          # GitHub Actions workflows
└── .moon/            # Moon workspace configuration
```

## Available Commands

### Global Commands (run from root)
- `moon run :install` - Install dependencies for all projects
- `moon run :build` - Build all projects
- `moon run :dev` - Start all services in development mode
- `moon run :test` - Run tests for all projects

### Backend Commands (cursed-server)
- `moon run cursed-server:dev` - Start the development server
- `moon run cursed-server:docker-dev` - Start the server in Docker with dependencies
- `moon run cursed-server:docker-build` - Build the server Docker image

### Frontend Commands (cursed-web)
- `moon run cursed-web:dev` - Start the development server
- `moon run cursed-web:build` - Build the production bundle
- `moon run cursed-web:docker-build` - Build the web Docker image

### Docker Commands
- `moon run compose-full:up` - Start all services with Docker Compose
- `moon run compose-full:down` - Stop all services
- `moon run compose-full:build` - Build all services

## CI/CD with GitHub Actions

This project uses GitHub Actions for continuous integration and deployment. The following workflows are available:

### Continuous Integration
- **CI**: Runs tests and builds for all projects

### Docker & Deployment
- **Docker Build & Publish**: Builds and publishes Docker images to GitHub Container Registry
- **Docker Compose**: Verifies Docker Compose setup
- **Dev Container**: Builds and publishes the development container

See the [Docker README](docker/README.md) for more details on containerization and CI/CD.

## Service Ports

Base port is 4150

| Port | Internal Port | Container | Description |
|------|--------------|-----------|-------------|
| 4150 | 80 | cursed-web | Web App Frontend |
| 4151 | 4151 | cursed-server | REST API Backend |
| 4152 | 5432 | postgres | PostgreSQL Database |
| 4153 | 8086 | influxdb | InfluxDB Time Series Database |
| 4154 | 4317 | otel-collector | OpenTelemetry Collector (gRPC) |
| 4155 | 4318 | otel-collector | OpenTelemetry Collector (HTTP) |
| 4156 | 9000 | clickhouse | ClickHouse Database (TCP) |
| 4157 | 8123 | clickhouse | ClickHouse Database (HTTP) |
| 4158 | 9181 | clickhouse | ClickHouse Database (Keeper) |
| 4159 | 6060 | query-service | SigNoz Query Service |
| 4160 | 3301 | frontend | SigNoz Frontend |

## Authentication Details

Default service credentials follow this pattern:
- Username: `cursed_{service_name}`
- Password: `VictoryFor{ServiceName}`
- DB/Service Name: `cursed`

For example, for PostgreSQL:
- Username: `cursed_postgres`
- Password: `VictoryForPostgres`
- Database: `cursed`

