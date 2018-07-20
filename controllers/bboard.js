// dependencies
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const billboard = require('billboard-top-100').getChart;


// index router
// returns the top 100 songs from saturday of current week
router.get('/', (request, response) => {
    billboard('hot-100', function (error, songs) {
        if (error) {
            console.log(error);
        }
        response.json(songs);
    });
});

// returns the hot 100 songs of specified date
// format: YYYY-MM-DD
router.get('/:date', (request, response) => {
    billboard('hot-100', request.params.date, function (error, songs) {
        if (error) {
            console.log(error);
        }
        response.json(songs);
    });
});

module.exports = router;
