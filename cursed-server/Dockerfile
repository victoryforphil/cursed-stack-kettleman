FROM ubuntu:22.04 as builder

WORKDIR /app

# Copy package files and dependencies and workspace
COPY ./cursed-server /app/cursed-server
COPY ./docker /app/docker
COPY ./scripts /app/scripts
COPY ./.moon /app/.moon

RUN ls -la

# Install dependencies

# Install PostgreSQL client tools
RUN apt update && \
    apt install -y postgresql-client && \
    apt install -y wget curl git unzip gzip xz-utils&& \
    apt clean && \
    rm -rf /var/lib/apt/lists/*
    
RUN /app/scripts/install_proto.sh

# Save /root/.proto/bin/proto to PATH
ENV PATH="/root/.proto/bin:$PATH"
RUN /app/scripts/install_moon.sh

RUN proto install bun

RUN cd /app && moon :install

# Build final image
FROM oven/bun:1.0.30 as runner

WORKDIR /app

# Copy from builder
COPY --from=builder /app /app

# Expose the port your app runs on
EXPOSE 3030

# Set environment variables
ENV NODE_ENV=production
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

ARG HTTP_PORT
ENV HTTP_PORT=${HTTP_PORT}

ARG INFLUXDB_URL
ENV INFLUXDB_URL=${INFLUXDB_URL}

ARG INFLUXDB_DB
ENV INFLUXDB_DB=${INFLUXDB_DB}



RUN chmod +x /app/cursed-server/scripts/entrypoint.sh

# Start the application
CMD ["/app/cursed-server/scripts/entrypoint.sh"] 