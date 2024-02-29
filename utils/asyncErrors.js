module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

// NOTES
// The async error catching function - 'asyncErrors ' simplifies error handling for asynchronous
//  Express route handlers. You can write asynchronous route handlers without worrying
//  about explicitly handling errors using try/catch blocks.
//  Any errors thrown within the wrapped function will
// automatically be caught and passed to the Express error-handling middleware.
