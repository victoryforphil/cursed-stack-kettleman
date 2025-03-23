import { t } from 'elysia';
import { createBaseRoute } from './base';
import { ServerError } from '../types/server_error';
import logger from '../logger';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const logEntryRoutes = createBaseRoute('/logs')
  // List all log entries
  .get('/', 
    async ({ query, set }: {
      query: { limit?: string },
      set: {
        status: number;
        headers: Record<string, string>;
      }
    }) => {
      try {
        logger.info('Listing log entries', { query });
        const limit = query.limit ? parseInt(query.limit) : 100;
        
        const logEntries = await prisma.logEntry.findMany({
          take: limit,
          orderBy: {
            createdAt: 'desc'
          }
        });

        return {
          success: true,
          data: logEntries
        };
      } catch (error: unknown) {
        if (error instanceof ServerError) {
          set.status = error.status;
          return { 
            success: false, 
            error: error.message
          };
        }
        set.status = 500;
        logger.error('Failed to list log entries', { error });
        return { 
          success: false, 
          error: 'Failed to list log entries'
        };
      }
    }, {
      query: t.Object({
        limit: t.Optional(t.String())
      })
    }
  )

  // Create a new log entry
  .post('/', 
    async ({ body, set }: { 
      body: { 
        message: string
      },
      set: {
        status: number;
        headers: Record<string, string>;
      }
    }) => {
      try {
        const { message } = body;
        logger.info('Creating log entry', { message });
        
        if (!message) {
          set.status = 400;
          return {
            success: false,
            error: 'No message provided'
          };
        }

        const logEntry = await prisma.logEntry.create({
          data: {
            message
          }
        });

        return {
          success: true,
          data: logEntry
        };
      } catch (err: unknown) {
        if (err instanceof ServerError) {
          set.status = err.status;
          return {
            success: false,
            error: err.message
          };
        }
        set.status = 500;
        return {
          success: false,
          error: 'Failed to create log entry'
        };
      }
    }, {
      body: t.Object({
        message: t.String()
      })
    }
  )

  // Get log entry by ID
  .get('/:id', 
    async ({ params: { id }, set }: {
      params: { id: string },
      set: {
        status: number;
        headers: Record<string, string>;
      }
    }) => {
      try {
        const logEntry = await prisma.logEntry.findUnique({
          where: { id }
        });

        if (!logEntry) {
          set.status = 404;
          return {
            success: false,
            error: 'Log entry not found'
          };
        }

        return {
          success: true,
          data: logEntry
        };
      } catch (err: unknown) {
        if (err instanceof ServerError) {
          set.status = err.status;
          return {
            success: false,
            error: err.message
          };
        }
        set.status = 500;
        return {
          success: false,
          error: 'Failed to get log entry'
        };
      }
    }, {
      params: t.Object({
        id: t.String()
      })
    }
  )

  // Delete a log entry
  .delete('/:id', 
    async ({ params: { id }, set }: {
      params: { id: string },
      set: {
        status: number;
        headers: Record<string, string>;
      }
    }) => {
      try {
        const logEntry = await prisma.logEntry.findUnique({
          where: { id }
        });

        if (!logEntry) {
          set.status = 404;
          return {
            success: false,
            error: 'Log entry not found'
          };
        }

        await prisma.logEntry.delete({
          where: { id }
        });

        return {
          success: true
        };
      } catch (err: unknown) {
        if (err instanceof ServerError) {
          set.status = err.status;
          return {
            success: false,
            error: err.message
          };
        }
        set.status = 500;
        return {
          success: false,
          error: 'Failed to delete log entry'
        };
      }
    }, {
      params: t.Object({
        id: t.String()
      })
    }
  );