/**
 * Custom error class for handling server-side errors with HTTP status codes.
 * Used throughout the application to provide consistent error handling and responses.
 */
export class ServerError extends Error {
    /**
     * Creates a new ServerError instance
     * 
     * @param message - The error message to display
     * @param status - The HTTP status code to return (defaults to 400 Bad Request)
     * @param details - Optional additional error details for debugging or client information
     */
    constructor(
      message: string,
      public status: number = 400,
      public details?: Record<string, any>
    ) {
      super(message);
      this.name = 'ServerError';
    }
  
    /**
     * Converts the error to a standardized response object
     * 
     * @returns An object containing the error message and HTTP status code
     */
    toResponse() {
      return {
        message: this.message,
        status: this.status
      }
    }
  }