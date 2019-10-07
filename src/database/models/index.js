//Import the mongoose module
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import config from '../config/config.js'

dotenv.config();

const env = process.env.NODE_ENV || 'development';

//Set up default mongoose connection
mongoose.connect(config[env].url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// Get the default connection
var db = mongoose.connection;

// db.on('connected', console.error.bind(console, 'Connection Open'))

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export default db;
