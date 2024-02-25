class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        // operational errors flag
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;

// Notes on  this custom error class:
// The Error.captureStackTrace(targetObject, constructorOpt) method is
// a built-in Node.js utility for capturing and storing the current call stack in an error object.
// this: The first argument passed to
//  Error.captureStackTrace() is the object to which the stack trace will be attached.
//  In this case, this refers to the instance of the AppError class being constructed.
// So, the stack trace will be captured and attached to the current instance of the AppError object.
// this.constructor: The second argument is optional and represents the function
// where the stack trace should begin. It indicates the constructor function that created
//  the error object. By passing this.constructor, you're specifying that the stack trace
// should start from the constructor of the current object (AppError).
// This helps in filtering out the internal implementation details of the custom error
// class itself from the stack trace.
