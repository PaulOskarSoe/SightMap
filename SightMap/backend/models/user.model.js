const mongoose = require("mongoose");

// TODO - Add a unique key
const userSchema = new mongoose.Schema({
    deviceId: {type: String, required: true},
    fullName: {type: String, required: true},
    markerIds: {type: [String], default: []}
});

const User = mongoose.model("user", userSchema);

module.exports = User;