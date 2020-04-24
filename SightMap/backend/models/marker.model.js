const mongoose = require("mongoose");

// TODO - Add a picture later
const markerSchema = new mongoose.Schema({
   userID: {type: String, required: true},
   latitude: {type: Number, required: true},
   longitude: {type: Number, required: true},
   description: {type: String, required: true},
});

const Marker = mongoose.model("marker", markerSchema);

module.exports = Marker;