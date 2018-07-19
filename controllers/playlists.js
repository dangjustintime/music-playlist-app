const express = require('express');
const router = express.Router();
const Playlists = require('../models/playlists.js');


router.get('/', (req, res) =>{
  Playlists.find({}, (err, foundPlaylists)=>{
    res.json(foundPlaylists);
  })
});

router.delete('/:id', (req, res)=>{
  Playlists.findByIdAndRemove(req.params.id, (err, deletedPlaylist)=>{
    res.json(deletedPlaylist);
  })
})

router.post('/', (req, res) => {
  Playlists.create(req.body, (err, createdPlaylist) => {
    res.json(createdPlaylist);
  });
})

router.put('/:id', (req, res)=>{
  Playlists.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedPlaylist)=>{
    res.json(updatedPlaylist)
  })
})

module.exports = router;
