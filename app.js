const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// MIDDLEWARE

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('combined'));
}

app.use(express.json());

app.use((req, res, next) => {
    console.log('Hello from Middeware ');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // Adding the current time to the request body
    next();
});
// creating a custom middleware function

// ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     message: ` Can't find ${req.originalUrl} on this server`,
    // });
    const err = new Error(`Can't find ${req.originalUrl} on this server`);
    // eslint-disable-next-line prettier/prettier
    (err.status = 'fail'), (err.statusCode = 404), 
    
    next(err);
});
// app.all , handles all http methods; specify url. using '*' is a wildcard

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

//  setting default values (err.statusCode = err.statusCode || 500;)
module.exports = app;
