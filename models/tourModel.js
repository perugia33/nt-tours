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

    ratingsQuantity: {
        type: Number,
        default: 0,
    },

    images: [String],

    createAt: {
        type: Date,
        default: Date.now,
        select: false,
    },
    // timestamp when new tour is created.
    startDates: [Date],

    secretTour: {
        type: Boolean,
        default: false,
    },
});

// Middleware- Mongoose  has 4 types
// 1) Document middleware runs before .save() or .create()
tourSchema.pre('save', function () {
    console.log(this);
});
// 2)query Middleware
// .pre runs before .find method
tourSchema.pre(/^find/, function (next) {
    this.find({ secretTour: { $ne: true } });
    this.start = Date.now();
    next();
});

// .post runs after .find() is completed
tourSchema.post(/^find/, function (docs, next) {
    console.log(`Query took ${Date.now() - this.start} ms`);
    console.log(docs);
    next();
});
//  /^find/, this regular expression for all query methods starting with 'find'

// { $ne: true }, where secretTour not equals true
// Model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
