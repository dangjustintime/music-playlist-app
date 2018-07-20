// dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// middleware
app.use(express.static('public'));
app.use(express.json());

const userController = require('./controllers/users.js');
app.use('/user', userController);
const playlistController = require('./controllers/playlists.js');
app.use('/playlist', playlistController);
const bboardController = require('./controllers/bboard.js');
app.use('/bboard', bboardController);

app.listen(3000, () => {
    console.log('listening...');
});

mongoose.connect('mongodb://localhost:27017/playlist_app', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongoose');
});
