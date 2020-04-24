const mongoose = require("mongoose");

// TODO - Add a picture later
const userSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    markerIDs: {type: [String], default: []}
});

const User = mongoose.model("user", userSchema);

module.exports = User;