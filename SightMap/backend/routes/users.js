const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const mongoose = require("mongoose");

// Get all users
router.get('/users', (req, res) => {
    User.find({}, function (err, docs) {
        if(err) return handleError(err);
        res.send(docs);
    })
});

// Get a specific user
router.get('/users/:userId', (req, res) => {
    User.findById(req.params.userId, function (err, doc) {
        if(err){
            handleError(err);
            return res.send(500);
        }
        console.log(doc);
        res.send(doc);
    })
});

// insert a new user
router.post('/users', (req, res) =>{
    const user = new User(req.body);
    user.save( err => {
        if(err){
            handleError(err);
            return res.send(500);
        }
        res.send(200)
    })
});

// delete a user
router.delete("/users/:userId", (req, res) => {
    User.deleteOne({"_id": mongoose.Types.ObjectId(req.params.userId)}, (err) => {
        if (err) {
            handleError(err);
            return res.send(500);
        }
        res.sendStatus(204);
    });
});

// TODO - make it more advanced
handleError = (err) =>{
    console.log(err)
};

module.exports = router;