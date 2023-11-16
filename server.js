const mongoose = require('mongoose');


const dotenv = require('dotenv');
const app = require('./app');
// Reads the config.env file and loads values into the process.env object.
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>',  process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then( () => {

    console.log('DB connection successful');
});
// To handle deprecation warnings


// Schema
tourSchema =  mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter the tour name'],     
        unique: true
    },

    duration: {
        type:String
    },

    price:  {
        type: Number,
        required: [true, "Enter the tour's price"] 
    },

    difficulty: {
        type: String
    },

    summary: {
        type: String,
        required: [true, 'Enter the tour-summary ']
    },

    description: {
        type: String,
    },

    ratingsAverage: {
        type: Number
    }

});

// Model
const Tour = mongoose.model('Tour', tourSchema);

const testTour = new  Tour({
    name: "Happy Camper Test",
    duration: "15 days & 14 nights",
    price: 1350,
    difficulty: "moderate",
    summary: "Wander the Quintessentially English Cotswolds Trail ",
    description: "Discover the enchanting beauty of the Cotswolds. Embark on a 5-day walk through the idyllic Cotswolds region in Gloucester, England. Immerse yourself in quintessentially English country inns, explore ancient commons, and meander through honey-colored villages. ",
    ratingsAverage: 5.0
});


testTour.save().then(doc => {
    console.log(doc);
}).catch(err => {
    console.log('Error : ', err)
})


// console.log(process.env);

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}....`);
});
