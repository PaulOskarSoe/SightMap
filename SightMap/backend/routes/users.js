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
  const { fullName, deviceId } = req.body;

  try {
    const findUser = await User.find({ fullName, deviceId }).count() > 0;
    const user = await User.find({ fullName, deviceId });
    if (findUser) {
      res.json(user[0]);
    } else {
      const userProps = new User(req.body);
      const newUser = await userProps.save();
      res.json(newUser);
    }
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

module.exports = router;
