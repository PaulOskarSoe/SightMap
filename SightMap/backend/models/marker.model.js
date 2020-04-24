const mongoose = require("mongoose");

// TODO - Add a picture later
const markerSchema = new mongoose.Schema({
   userId: {type: String, required: true},
   latitude: {type: Number, required: true},
   longitude: {type: Number, required: true},
   description: {type: String, required: false},
});

const Marker = mongoose.model("marker", markerSchema);

module.exports = Marker;