/**
 * Interface for REST API result responses
 */
export interface RestResult<T = any> {
  success: boolean;
  message: string;
  status: number;
  data: T;
  timestamp: string;
}

/**
 * Creates a successful REST result
 */
export function makeRestResult<T>(
  data: T, 
  message: string = 'Success',
  success: boolean = true,
  status: number = 200
): RestResult<T> {
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
export function makeErrorResult(
  message: string,
  status: number = 500,
  data: any = null
): RestResult {
  return {
    success: false,
    message,
    status,
    data,
    timestamp: new Date().toISOString()
  };
} 