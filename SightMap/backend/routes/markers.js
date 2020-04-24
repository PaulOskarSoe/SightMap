const express = require('express');
const router = express.Router();
const Marker = require('../models/marker.model');
const mongoose = require("mongoose");


// Get all markers
router.get('/markers', (req, res) => {
    Marker.find({}, function (err, docs) {
        if(err) return handleError(err);
        res.send(docs);
    })
});

// Get a specific marker
router.get('/markers/:markerId', (req, res) => {
    Marker.findById(req.params.markerId, function (err, doc) {
        if(err){
            handleError(err);
            return res.send(500);
        }
        console.log(doc);
        res.send(doc);
    })
});

// insert a new marker
router.post('/markers', (req, res) =>{
    const marker = new Marker(req.body);
    marker.save( err => {
        if(err){
            handleError(err);
            return res.send(500);
        }
        res.send(200)
    })
});

// delete a marker
router.delete("/markers/:markerId", (req, res) => {
    Marker.deleteOne({"_id": mongoose.Types.ObjectId(req.params.markerId)}, (err) => {
        if (err) {
            handleError(err);
            return res.send(500);
        }
        res.send(204);
    });
});

// TODO - make it more advanced
handleError = (err) =>{
  console.log(err)
};


module.exports=router;