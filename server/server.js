const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();


const app = express();
const dbConnect = process.env.DATABASE;

//  Middleware
app.use(cors());

app.options('*', cors());

app.use(express.json());

app.use(morgan('dev'));

// Routes middleware
// Uses fs module to read routes folder sync maps over so we can read all
fs.readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

// DB Connection
mongoose.connect(dbConnect)
// On Success
.then(() => {
    console.log('Database Connection Successful !')
})
// On Failure
.catch((err) => {
    console.log(err)
})

// Run server with msg on success
app.listen(8000, () => {
    console.log('Backend Server running on http://localhost:8000');
})