import { PrismaClient } from '@prisma/client';
import logger from "../logger";
import prisma from '../clients/prisma';

/**
 * Controller for managing log entries
 */
export const logEntryController = {
    /**
     * Creates a new log entry
     * 
     * @param message - The log message to create
     * 
     * @throws Error if required fields are missing or invalid
     * 
     * @returns The created log entry
     */
    createLogEntry: async (message: string) => {
        try {
            // Validate required fields
            if (!message) {
                logger.error('Message is required');
                throw new Error('Message is required');
            }

            logger.info('Creating log entry:', { message });

            // Create log entry in database
            const logEntry = await prisma.logEntry.create({
                data: {
                    message
                }
            });

            logger.info(`Log entry ${logEntry.id} created successfully`);
            return logEntry;
        } catch (error) {
            logger.error('Failed to create log entry:', {
                error: error instanceof Error ? error.message : String(error),
                message
            });
            throw new Error('Failed to create log entry');
        }
    },

    /**
     * Gets a log entry by its id
     * 
     * @param id - The log entry id
     * 
     * @throws Error if log entry not found
     * 
     * @returns The log entry data
     */
    getLogEntry: async (id: string) => {
        try {
            const logEntry = await prisma.logEntry.findUnique({
                where: { id }
            });

            if (!logEntry) {
                logger.error(`Log entry not found: ${id}`);
                throw new Error('Log entry not found');
            }

            return logEntry;
        } catch (error) {
            logger.error('Failed to get log entry:', {
                error: error instanceof Error ? error.message : String(error),
                id
            });
            throw new Error('Failed to get log entry');
        }
    },

    /**
     * Lists all log entries
     * 
     * @returns Array of log entries
     */
    listLogEntries: async () => {
        try {
            const logEntries = await prisma.logEntry.findMany({
                orderBy: {
                    createdAt: 'desc'
                }
            });
            
            return logEntries;
        } catch (error) {
            logger.error('Failed to list log entries:', {
                error: error instanceof Error ? error.message : String(error)
            });
            throw new Error('Failed to list log entries');
        }
    },

    /**
     * Updates a log entry's message
     * 
     * @param id - The log entry id
     * @param message - New message
     * 
     * @throws Error if log entry not found
     * 
     * @returns The updated log entry
     */
    updateLogEntry: async (id: string, message: string) => {
        try {
            // Validate required fields
            if (!message) {
                logger.error('Message is required');
                throw new Error('Message is required');
            }

            // Check if log entry exists
            const existingLogEntry = await prisma.logEntry.findUnique({
                where: { id }
            });

            if (!existingLogEntry) {
                logger.error(`Log entry not found: ${id}`);
                throw new Error('Log entry not found');
            }

            logger.info(`Updating log entry: ${id}`);

            const updatedLogEntry = await prisma.logEntry.update({
                where: { id },
                data: { message }
            });

            logger.info(`Log entry ${id} updated successfully`);
            return updatedLogEntry;
        } catch (error) {
            logger.error('Failed to update log entry:', {
                error: error instanceof Error ? error.message : String(error),
                id
            });
            throw new Error('Failed to update log entry');
        }
    },

    /**
     * Deletes a log entry
     * 
     * @param id - The log entry id
     * 
     * @throws Error if log entry not found
     * 
     * @returns The deleted log entry
     */
    deleteLogEntry: async (id: string) => {
        try {
            // Check if log entry exists
            const existingLogEntry = await prisma.logEntry.findUnique({
                where: { id }
            });

            if (!existingLogEntry) {
                logger.error(`Log entry not found: ${id}`);
                throw new Error('Log entry not found');
            }

            logger.info(`Deleting log entry: ${id}`);

            const deletedLogEntry = await prisma.logEntry.delete({
                where: { id }
            });

            logger.info(`Log entry ${id} deleted successfully`);
            return deletedLogEntry;
        } catch (error) {
            logger.error('Failed to delete log entry:', {
                error: error instanceof Error ? error.message : String(error),
                id
            });
            throw new Error('Failed to delete log entry');
        }
    }
}; 