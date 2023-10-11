const express = require('express');
const router = express.Router(); 
const User = require('../models/user') 
const bcrpyt = require('bcrypt')
const jwt = require('jsonwebtoken'); 


// For sign up
router.post('/signup', (req, res) => {  

    bcrpyt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            username: req.body.username, 
            password: hash
        }); 
        user.save() 
        .then(result => {
            res.status(201).json({
                message: "User created", 
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    });
}); 

// For logging in. 
router.post('/login', (req, res) => {
    let fetchedUser; 
    User.findOne({ username: req.body.username })
    .then(user => {
        console.log('User found', user); 
        if(!user) {
            return res.status(401).json({
                message: "Username not found"
            });
        }

        fetchedUser = user; 

        return bcrpyt.compare(req.body.password, user.password)
    })
    .then(result => {
        console.log('Password comparison result: ', result); 
        if(!result) {
            return res.status(401).json({
                message: "Incorrect password"
            })
        } 

        const token = jwt.sign(
            { username: fetchedUser.username, userid: fetchedUser._id},
            'secret_this_should_be_longer_than_it_is', 
            { expiresIn: '1h'}
        );

        res.status(200).json({ token: token }); 

    })
    .catch( err => {
        console.error('Error', err); 
        return res.status(401).json({
            message: "Authentication Failure"
        });
    });
});

module.exports = router 