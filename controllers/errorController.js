module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
};

// The second error middleware (app.use((err, req, res, next) => { ... })) handles errors
// that occur during the processing of requests.
//  setting default values (err.statusCode = err.statusCode || 500;)
