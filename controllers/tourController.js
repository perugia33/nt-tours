const fs = require('fs');
const Tour = require('./../models/tourModel');

// ROUTE HANDLERS

// Get all Tours
exports.getAllTours = async (req, res) => {
    try {
        // eslint-disable-next-line node/no-unsupported-features/es-syntax
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach((el) => delete queryObj[el]);
        // console.log()

        let queryString = JSON.stringify(queryObj);

        let query = Tour.find(JSON.parse(queryString));
        console.log(JSON.parse(queryString));

        // Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(' , ').join('   ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createAt');
        }

        // field limiting
        if (req.query.fields) {
            const fields = req.query.fields.split(' , ').join(' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v');
        }

        // Pagination
        // defiining default value
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 10;
        const skip = (page - 1) * limit;
        // calculating skip
        query = query.skip(skip).limit(limit);
        if (req.query.page) {
            const numTours = await Tour.countDocuments();
            if (skip >= numTours) throw new Error('This page does not exist');
        }

        // Sorting
        // if (req.query.sort) {
        //     const sortBy = req.query.sort.split(',').join(' '); // Handling multiple sorting fields
        //     query = query.sort(sortBy);
        // }

        const tours = await query;
        // if (queryObj.price) {
        //     pric
        // }
        //  Tour.find({
        // price: { $gte: parseInt(gte) },
        // .where('price').gte(2000); Mongoose Query Method
        // .where('difficulty').equals('easy')
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

// @@@@ const tours = await Tour.find({
    // price: { $gte: parseInt(gte) || 2000 },
// });
// MongoDb Query method
// Get Tour by Id
exports.getTourById = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

// Create New Tour
exports.createNewTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

// Update Tour details
exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        //  new:true will return updated doc
        res.status(200).json({
            status: 'success',
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

// Delete Tour
exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

//  MIDDLEWARE
// Validate Id
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
