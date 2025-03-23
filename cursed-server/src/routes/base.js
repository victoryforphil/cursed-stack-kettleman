import { Elysia } from 'elysia';
import logger from '../logger';
import { ServerError } from '../types/server_error';
import { makeRestResult, makeErrorResult } from '../types/rest';
function formatValidationError(error) {
    // Type guard for ValidationError
    if (!error || typeof error !== 'object' || !('validator' in error) || !('value' in error)) {
        return {
            type: 'unknown',
            message: 'Unknown validation error',
            details: { error }
        };
    }
    const validationError = error;
    const { type, value, validator } = validationError;
    const schema = validator?.schema;
    // Get required fields from schema
    const requiredFields = schema?.required || [];
    // Check which required fields are missing
    const missingFields = requiredFields.filter((field) => !value || !value[field]);
    // Check for invalid fields (present but wrong type)
    const invalidFields = Object.entries(value || {}).reduce((acc, [key, val]) => {
        const fieldSchema = schema?.properties?.[key];
        if (fieldSchema && typeof val !== fieldSchema.type) {
            acc.push({
                field: key,
                expected: fieldSchema.type,
                received: typeof val
            });
        }
        return acc;
    }, []);
    // Create human readable message
    const messages = [];
    if (missingFields.length > 0) {
        if (missingFields.length === 1) {
            messages.push(`The field "${missingFields[0]}" is required`);
        }
        else {
            const lastField = missingFields[missingFields.length - 1];
            const otherFields = missingFields.slice(0, -1).join('", "');
            messages.push(`The fields "${otherFields}" and "${lastField}" are required`);
        }
    }
    if (invalidFields.length > 0) {
        invalidFields.forEach(({ field, expected, received }) => {
            messages.push(`The field "${field}" should be a ${expected}, but received ${received}`);
        });
    }
    const message = messages.join('. ');
    return {
        type,
        message: message || 'Validation failed',
        details: {
            missing_required_fields: missingFields,
            invalid_fields: invalidFields,
            received_value: value
        }
    };
}
export function createBaseRoute(prefix) {
    return new Elysia({ prefix })
        .onError(({ code, error, set }) => {
        logger.error(`Error in ${prefix} route:`, { code });
        if (error instanceof ServerError) {
            set.status = error.status;
            return makeErrorResult(error.message, error.status, error.toResponse());
        }
        if (code === 'VALIDATION') {
            set.status = 400;
            const formattedError = formatValidationError(error);
            return makeErrorResult(formattedError.message, 400, formattedError);
        }
        // If error has a status field, use it
        let status = 500;
        if (error instanceof Error && 'status' in error && typeof error.status === 'number') {
            status = error.status;
        }
        else {
            status = code === 'NOT_FOUND' ? 404 : 500;
        }
        set.status = status;
        return makeErrorResult(error instanceof Error ? error.message : "Something went wrong. (see console)", status, error);
    })
        .onRequest(({ request }) => {
        logger.info(`${request.method} ${request.url}`);
    })
        .derive(({ set }) => ({
        // Add helper to wrap successful responses
        wrapSuccess: (content, message = '') => {
            return makeRestResult(content, message, true, typeof set.status === 'number' ? set.status : 200);
        }
    }));
}
