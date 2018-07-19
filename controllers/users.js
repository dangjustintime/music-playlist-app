const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');



router.get('/:id', (req, res) =>{
  User.findById(req.params.id, (err, foundUser)=>{
    res.json(foundUser);
  })
});

router.delete('/:id', (req, res)=>{
  User.findByIdAndRemove(req.params.id, (err, deletedUser)=>{
    res.json(deletedUser);
  })
})

router.put('/:id', (req, res)=>{
  User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedUser)=>{
    res.json(updatedUser)
  })
})

router.post('/', (req, res)=>{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser)=>{
        res.status(201).json({
            status:201,
            message:"user created"
        })
    });
});

module.exports = router;
