import { Elysia } from "elysia";

import logger from './logger';
import { logEntryRoutes } from './routes/log_entry';
import { cors } from '@elysiajs/cors';
import { opentelemetry } from '@elysiajs/opentelemetry';
import { swagger } from '@elysiajs/swagger';

import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { config } from './config';

// Create base app with state
const app = new Elysia();

// Apply plugins with improved type compatibility
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(swagger());




app.use(opentelemetry({
  serviceName: 'cursed-server',
  spanProcessors: [
    new BatchSpanProcessor(
      new OTLPTraceExporter({
        url: 'http://localhost:4317/v1/traces',
      })
    )
  ],
}));

// Enhanced logging middleware
app.onRequest((context) => {
  const { request } = context;
  const method = request.method;
  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent') || '-';
  const path = url.pathname;
  
  // Using empty objects as fallbacks
  const query = {};
  const params = {};
  
  const logData = {
    method,
    path,
    query: Object.keys(query).length > 0 ? query : undefined,
    params: Object.keys(params).length > 0 ? params : undefined,
    userAgent
  };
  
  // Filter out undefined values for cleaner logs
  const cleanLogData = Object.fromEntries(
    Object.entries(logData).filter(([_, v]) => v !== undefined)
  );
  
  logger.info(`${method} ${path}`, cleanLogData);
});

app.use(logEntryRoutes);

// Start the server
app.listen(config.http.port);

logger.info(
  `🦊 Cursed Server / Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

// Cleanup on exit
process.on('SIGTERM', async () => {
  logger.info('Server is shutting down');
  process.exit(0);
});

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

export type App = typeof app 
