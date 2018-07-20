// dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(session({
    secret:'feedmeseymour',
    resave: false,
    saveUninitialized: false
}));

// controllers
const userController = require('./controllers/users.js');
app.use('/users', userController);
const playlistController = require('./controllers/playlists.js');
app.use('/playlists', playlistController);
const bboardController = require('./controllers/bboard.js');
app.use('/bboard', bboardController);
const sessionController = require('./controllers/sessions.js');
app.use('/sessions', sessionController);

// listening to port
app.listen(PORT, () => {
    console.log('listening to port', PORT);
});

// connectiong to mongodb
mongoose.connect('mongodb://localhost:27017/playlist_app', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongoose');
});
