const fs = require('fs');
const Tour = require('./../models/tourModel');

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

// ROUTE HANDLERS

// Get all Tours
exports.getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'sucess',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours,
        },
    });
};

// Create New Tour
exports.createNewTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours, null, 2),
        (err) => {
            res.status(201).json({
                status: 'sucess',
                data: {
                    newTour,
                },
            });
        },
    );
};

// Get Tour by Id
exports.getTourById = (req, res) => {
    // console.log(req.params)
    const id = req.params.id * 1;
    // converting params type string to number
    const tour = tours.find((el) => el.id === id);

    res.status(200).json({
        status: 'sucess',
        data: {
            tour,
        },
    });
};

// Update Tour details
exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'sucess',
        data: {
            tour: '<Updated Tour here>',
        },
    });
};

// Delete Tour
exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'sucess',
        data: null,
    });
};
