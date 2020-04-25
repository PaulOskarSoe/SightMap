const express = require('express');

const router = express.Router();
const User = require('../models/user.model');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
    res.status(200);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

// Get a specific user by id
router.get('/:userId', async (req, res) => {
  const userID = req.params.userId;
  try {
    const user = await User.findById(userID);
    res.json(user);
    res.status(200);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

// insert a new user
router.post('/', async (req, res) => {
  const user = req.body && new User(req.body);
  try {
    const newUser = await user.save();
    res.json(newUser);
    res.status(200);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

// remove marker from markerIds
// router.delete('/:userId/markers/:markerId', (req, res) => {
// });

// delete a user
// router.delete('/:userId', (req, res) => {
//   User.deleteOne({ _id: mongoose.Types.ObjectId(req.params.userId) }, (err) => {
//     if (err) {
//       return res.send(500);
//     }
//     res.sendStatus(204);
//   });
// });

module.exports = router;
