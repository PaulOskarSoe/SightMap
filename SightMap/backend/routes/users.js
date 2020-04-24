const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Marker = require('../models/marker.model');
const mongoose = require("mongoose");

router.param("userId", (req, res, next, userId) => {
    User.findById(userId, (err, user) => {
        if (err || !user) return res.status(500).send("user params error");
        req.user = user;
        next();
    });
});

router.param("markerId", (req, res, next, markerId) => {
    Marker.findById(markerId, (err, marker) => {
        if (err || !marker) return res.status(500).send("marker params error");
        req.marker = marker;
        next();
    });
});

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

//returns user object
router.get("/:userId", (req, res) => {
    res.send(req.user).push();
});

router.put('/users/:userId/markers/:markerId', (req, res) => {
    req.user.markerIds.push(req.marker._id.toString());
    req.user.save((err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("error saving marker to markers");
        }
        res.send(200);
    });
});

// remove marker from markerIds
router.delete("/users/:userId/markers/:markerId", (req, res) => {
    const index = req.user.markerIds.findIndex(markerId => markerId === req.marker._id.toString());
    req.user.markerIds.splice(index, 1);
    req.user.save((err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("error deleting marker from markers");
        }
        res.send(200);
    });
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