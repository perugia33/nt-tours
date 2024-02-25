const express = require('express');
const morgan = require('morgan');

const appError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
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

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    next(new appError(`Can't find ${req.originalUrl} on this server`, 404));
});
// app.all , handles all http methods requests having the incorrect route; specifies url.
//  Using '*' is a wildcard

app.use(globalErrorHandler);

module.exports = app;
