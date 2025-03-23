/**
 * Creates a successful REST result
 */
export function makeRestResult(data, message = 'Success', success = true, status = 200) {
    return {
        success,
        message,
        status,
        data,
        timestamp: new Date().toISOString()
    };
}
/**
 * Creates an error REST result
 */
export function makeErrorResult(message, status = 500, data = null) {
    return {
        success: false,
        message,
        status,
        data,
        timestamp: new Date().toISOString()
    };
}
