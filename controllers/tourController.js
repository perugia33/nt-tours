const fs = require('fs');
const Tour = require('./../models/tourModel');

const APIFeatures = require('./../utils/apiFeatures');
const asyncErrors = require('./../utils/asyncErrors');
const AppError = require('./../utils/appError');

exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '3';
    req.query.sort = '-ratingsAverage, price';
    req.query.fields = 'name, price, ratingsAverage, summary, difficulty';
    next();
};

// ROUTE HANDLERS

// Get all Tours
exports.getAllTours = asyncErrors(async (req, res, next) => {
    // Execute query
    const features = new APIFeatures(Tour.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const tours = await features.query;
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours,
        },
    });
});

exports.getTourById = asyncErrors(async (req, res, next) => {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
        return next(new AppError('No tour found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour,
        },
    });
});

// Create New Tour  * See notes below

exports.createNewTour = asyncErrors(async (req, res, next) => {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour,
        },
    });
});

// Update Tour details
exports.updateTour = asyncErrors(async (req, res, next) => {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!tour) {
        return next(new AppError('No tour found with that ID', 404));
    }
    //  new:true will return updated doc
    res.status(200).json({
        status: 'success',
        data: {
            tour,
        },
    });
});

// Delete Tour
exports.deleteTour = asyncErrors(async (req, res, next) => {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    if (!tour) {
        return next(new AppError('No tour found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null,
    });
});

// Agregation Pipeline MongoDB

exports.getTourStats = asyncErrors(async (req, res, next) => {
    const stats = await Tour.aggregate([
        {
            $match: { ratingsAverage: { $gte: 4.5 } },
        },
        {
            $group: {
                _id: '$difficulty',
                numTours: { $sum: 1 },
                numRatings: { $sum: '$ratingsQuantity' },
                avgRating: { $avg: '$ratingsAverage' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' },
            },
        },

        {
            $sort: { avgPrice: 1 },
        },
    ]);
    res.status(200).json({
        status: 'success',
        data: {
            stats,
        },
    });

    // The agregation pipeline is a MongoDB feature
});

// Using agregation pipeline to calculate how many tours start each month
exports.getMonthlyPlan = asyncErrors(async (req, res, next) => {
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
        {
            $unwind: '$startDates',
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01T00:00:00.000Z`),
                    $lte: new Date(`${year}-12-31T23:59:59.999Z`),
                },
            },
        },
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            plan,
        },
    });
});

// NOTES
// The async error catching function - 'asyncErrors ' simplifies error handling for asynchronous
//  Express route handlers. You can write asynchronous route handlers without worrying
//  about explicitly handling errors using try/catch blocks.
//  Any errors thrown within the wrapped function will
// automatically be caught and passed to the Express error-handling middleware.

// ORIGINAL CODE
// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

//  MIDDLEWARE
// Validate Idn
// exports.verifyID = (req, res, next, val) => {
//     console.log(`Tour Id is :  ${val} `);
//     if (req.params.id * 1 > tours.length) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid Id',
//         });
//     }
//     next();
// };
// val = the value of the parameter. Consolidates the tour ID verification logic into a single middleware function

// exports.checkReqBody = (req, res, next) => {
//     if (!req.body.name || !req.body.price) {
//         return res.status(400).json({
//             status: 'fail',
//             message: 'Missing name or price',
//         });
//     }
//     next();
// };
