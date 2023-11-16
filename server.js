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


// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}....`);
});
