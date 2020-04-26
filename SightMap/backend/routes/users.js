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

const doesUserExist = ({user}) => new Promise(async (resolve, reject) => {
  await User.find({fullName : user.fullName, deviceId: user.deviceId}, (err, doc) => {
    if(err) return reject(err);
    if(doc.length) return reject("User Already Exists");
    return resolve(user);
  });
});


// insert a new user
router.post('/', (req, res) => {
  const user = req.body && new User(req.body);
  doesUserExist({user})
  .then( async (user) => {
    const newUser = await user.save();
    res.json(newUser);
    res.status(200);
  })
  .catch(err => {
    res.status(500);
    res.send(err);
  });
});

module.exports = router;
