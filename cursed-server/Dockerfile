FROM oven/bun:1.0.30 as builder

WORKDIR /app

# Copy package files and dependencies and workspace
COPY cursed-server /app

# Install dependencies
RUN cd /app && ./scripts/install_proto.sh

RUN cd /app && ./scripts/install_moon.sh

RUN cd /app && moon :install

# Build final image
FROM oven/bun:1.0.30 as runner

# Install PostgreSQL client tools
RUN apt-get update && \
    apt-get install -y postgresql-client && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# Copy from builder
COPY --from=builder /app /app

# Expose the port your app runs on
EXPOSE 3030


# Set environment variables
ENV NODE_ENV=production

RUN chmod +x /usr/src/app/scripts/entrypoint.sh

# Start the application
CMD ["/usr/src/app/scripts/entrypoint.sh"] 