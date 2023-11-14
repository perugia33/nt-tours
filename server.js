const mongoose = require('mongoose');


const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>',  process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con =>{
    console.log(con.connections);
    console.log('DB connection successful')
})
// To handle deprecation warnings
const app = require('./app');
// Reads the config.env file and loads values into the process.env object.

// console.log(process.env);

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}....`);
});
