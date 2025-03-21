# Cursed Server

Backend server for the Cursed Stack Kettleman project, built with Bun, Prisma, and TypeScript.

## Features

- Built with Bun for high performance
- Prisma ORM for database management
- PostgreSQL for relational data
- InfluxDB for time series data
- Docker support for development and production

## Development

### Prerequisites

- [Proto](https://moonrepo.dev/proto) with Bun and Moon installed
- Docker and Docker Compose (for running dependencies)
- Node.js 18+ (for some development tools)

### Getting Started

1. Install dependencies:
   ```bash
   moon run :install
   ```

2. Start the development environment (includes PostgreSQL and InfluxDB):
   ```bash
   moon run cursed-server:docker-dev
   ```

3. Start the development server:
   ```bash
   moon run cursed-server:dev
   ```

The server will be available at http://localhost:4151

### Available Commands

- `moon run cursed-server:dev` - Start the development server
- `moon run cursed-server:docker-dev` - Start the server with Docker dependencies
- `moon run cursed-server:docker-build` - Build the Docker image
- `moon run cursed-server:prisma-generate` - Generate Prisma client
- `moon run cursed-server:prisma-migrate` - Run database migrations

### Environment Variables

The following environment variables are required:

```env
DATABASE_URL=postgresql://cursed_postgres:VictoryForPostgres@localhost:4152/cursed
```

### Database Access

PostgreSQL connection details:
- Host: localhost
- Port: 4152
- Database: cursed
- Username: cursed_postgres
- Password: VictoryForPostgres

### Project Structure

```
cursed-server/
├── src/              # Source code
├── prisma/           # Database schema and migrations
├── scripts/          # Utility scripts
├── tests/            # Test files
└── moon.yml         # Moon configuration
```

### API Documentation

API documentation is available at http://localhost:4151/docs when running in development mode.

## Docker

### Development

The development environment can be started with:

```bash
moon run cursed-server:docker-dev
```

This will start:
- PostgreSQL on port 4152
- InfluxDB on port 4153

### Production

Build the production Docker image:

```bash
moon run cursed-server:docker-build
```

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Ensure PostgreSQL container is running
   - Verify the DATABASE_URL environment variable
   - Check if port 4152 is available

2. **Prisma Client Issues**
   - Run `moon run cursed-server:prisma-generate`
   - Ensure database migrations are up to date

3. **Docker Issues**
   - Ensure Docker daemon is running
   - Check if required ports are available
   - Verify Docker resource allocation

## Contributing

Please refer to the main project's README for contribution guidelines.

## License

This project is licensed under the terms found in the LICENSE file at the root of the repository.