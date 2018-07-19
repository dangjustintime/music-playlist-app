// dependencies
/*
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
*/
const billboard = require('billboard-top-100').getChart;

billboard('hot-100', function(error, songs) {
    if (error) console.log(error);
    console.log(songs);
});

// index route

// create route

// delete route

// update route


// module.exports = router;
