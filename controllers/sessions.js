const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.delete('/', (req, res)=>{
    req.session.destroy(() => {
        res.status(200).json({
            status:200,
            message:'logout complete'
        })
    })
});

router.post('/', (req, res)=>{
    User.findOne({username:req.body.username}, (err, foundUser)=>{
        if(foundUser && bcrypt.compareSync(req.body.password, foundUser.password)){
            req.session.currentUser = foundUser;
            res.status(201).json(foundUser)
        } else {
            res.status(401).json({
                status: 401,
                message: "login failed"
            })
        }
    })
})

module.exports = router;
