const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
// Reads the config.env file and loads values into the process.env object.

const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('DB connection successful');
    });

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}....`);
});
