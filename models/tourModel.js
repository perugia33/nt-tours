const mongoose = require('mongoose');

// Schema
tourSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter the tour name'],
        unique: true,
    },

    duration: {
        type: String,
        required: [true, 'A tour must have a duration'],
    },

    price: {
        type: Number,
        required: [true, "Enter the tour's price"],
    },

    difficulty: {
        type: String,
    },

    summary: {
        type: String,
        required: [true, 'The tour-summary is required '],
        trim: true,
    },

    description: {
        type: String,
    },

    ratingsAverage: {
        type: Number,
    },

    images: [String],

    createAt: {
        type: Date,
        default: Date.now,
        select: false,
    },
    // timestamp when new tour is created.
});

// Model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

// const testTour = new Tour({
//     name: 'Happy Camper Test15',
//     duration: '15 days & 14 nights',
//     price: 1350,
//     difficulty: 'moderate',
//     summary: 'Wander the Quintessentially English Cotswolds Trail ',
//     description:
//         'Discover the enchanting beauty of the Cotswolds. Embark on a 5-day walk through the idyllic Cotswolds region in Gloucester, England. Immerse yourself in quintessentially English country inns, explore ancient commons, and meander through honey-colored villages. ',
//     ratingsAverage: 5.0,
// });

// testTour
//     .save()
//     .then((doc) => {
//         console.log(doc);
//     })
//     .catch((err) => {
//         console.log('Error : ', err);
//     });
