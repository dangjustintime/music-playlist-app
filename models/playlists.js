const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
      name: String,
      owner: String,
      songs: [{
          artist: String,
          title: String,
          cover: String
      }]
})

const Playlists = mongoose.model('Playlist', playlistSchema);

module.exports = Playlists;
