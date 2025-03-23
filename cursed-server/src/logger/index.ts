import winston from 'winston';
import path from 'path';

const { combine, timestamp, json, printf, colorize } = winston.format;

// Custom format for console output
const consoleFormat = printf((info) => {
  const { level, message, timestamp, ...metadata } = info;
  const metadataStr = Object.keys(metadata).length 
    ? `\n${JSON.stringify(metadata, null, 2)}` 
    : '';
    
  return `${timestamp} [${level}]: ${message}${metadataStr}`;
});

// Create logs directory if it doesn't exist
const logsDir = path.join(process.cwd(), 'logs');
if (!require('fs').existsSync(logsDir)) {
  require('fs').mkdirSync(logsDir);
}

// Configure logger with console and file transports
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS'
    }),
    json()
  ),
  transports: [
    // Console transport with custom format
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp(),
        consoleFormat
      )
    }),
    // File transport for errors
    new winston.transports.File({ 
      filename: path.join(logsDir, 'error.log'),
      level: 'error'
    }),
    // File transport for all logs
    new winston.transports.File({ 
      filename: path.join(logsDir, 'combined.log')
    })
  ]
});

// Create stream for Morgan integration
const loggerStream = {
  write: (message: string) => {
    logger.http(message.trim());
  }
};

// @ts-ignore - Adding a non-standard property to the logger
logger.stream = loggerStream;

export default logger; 