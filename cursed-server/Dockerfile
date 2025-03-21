FROM ubuntu:22.04 as builder

WORKDIR /app

# Copy package files and dependencies and workspace
COPY ./cursed-server /app/cursed-server
COPY ./scripts /app/scripts
COPY ./.moon /app/.moon

RUN ls -la

# Install dependencies

# Install PostgreSQL client tools
RUN apt update && \
    apt install -y postgresql-client && \
    apt install -y wget curl git unzip gzip xz-utils build-essential && \
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

RUN chmod +x /app/cursed-server/scripts/entrypoint.sh

# Start the application
CMD ["/app/cursed-server/scripts/entrypoint.sh"] 