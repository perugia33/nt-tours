
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();


// MIDDLEWARE

app.use(morgan("combined"));
app.use(express.json());


app.use((req,  res ,  next) =>{
        console.log("Hello from the middleware");
        next();
});

app.use((req,  res ,  next) => {
    req.requestTime =  new Date().toISOString();
    // Adding the current time to the request body
    next();
});
// creating a custom middleware function


// ROUTES

 app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);   



module.exports = app;