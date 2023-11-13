const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');
// Reads the config.env file and loads values into the process.env object.

// console.log(process.env);

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}....`);
});
