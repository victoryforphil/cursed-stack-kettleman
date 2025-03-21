# cursed-stack-kettleman
Kettleman Stack - Frontend: React + Bun + Mantine + Vite - Backend: Bun + Prisma + Postgres + Influx

## Development Setup

### Using Devcontainer

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

## PORTS (temp notes)
Base is 4150

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

## Auth Notes

- Username: cursed_{service_name}
- Password: VictoryFor{ServiceName}
- DB/Service Name: cursed
