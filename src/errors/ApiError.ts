class ApiError extends Error {
    statusCode: number;
  
    isOperational: boolean;

    error:string
  
    override stack?: string;
  
    constructor(statusCode: number, message: string, isOperational = true, stack = '') {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      this.error = message
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  export default ApiError;
  