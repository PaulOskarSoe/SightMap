const express = require('express');

const router = express.Router();
const Marker = require('../models/marker.model');
const geoLocationKey = process.env.API_KEY;
const fetch = require("node-fetch");


// Get all markers
router.get('/', async (req, res) => {
  try {
    const markers = await Marker.find({});
    res.json({ markers });
    res.status(200);
  } catch (error) {
    res.send(error);
    res.status(500);
  }
});

// Get a specific marker
router.get('/:markerId', async (req, res) => {
  const markerID = req.params.markerId;
  try {
    const marker = await Marker.findById(markerID);
    res.json({ marker });
    res.send(200);
  } catch (error) {
    res.send(error);
    res.send(500);
  }
});

// insert a new marker
router.post('/', async (req, res) => {
  const userId = req.body.userID;
  const description = req.body.description;
  const address = req.body.address;
  let geoLocation = null
  await fetch(`https://us1.locationiq.com/v1/search.php?key=${geoLocationKey}&q=${address}&format=json`)
    .then(res => res.json())
    .then(data => geoLocation = data[0])
    .catch((err) => console.log(err));
  const latitude = geoLocation["boundingbox"][0];
  const longitude = geoLocation["boundingbox"][3];
  
  const marker = new Marker({userId, address ,latitude, longitude, description})
  try {
    const response = await marker.save();
    res.json({ response });
    res.status(200);
  } catch (error) {
    res.status(500)
    res.send({error})
  }
  console.log('marker', marker);


});

// delete a marker
router.delete('/:markerId', async (req, res) => {
  const markerID = req.params.markerId;
  try {
    const response = await Marker.deleteOne({ _id: markerID });
    res.json({ response });
    res.send(204);
  } catch (error) {
    res.send(error);
    res.status(500);
  }
});

module.exports = router;
