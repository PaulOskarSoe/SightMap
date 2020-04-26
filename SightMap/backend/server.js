/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const username = 'sanderzhanni';
const password = '3o72qMrQbD4g8tWs'; // Proccess.env later

const markers = require('./routes/markers');
const users = require('./routes/users');


const app = express();
const PORT = 3000;
const DB_URL = `mongodb+srv://${username}:${password}@rakprog-aq8p2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const listen = () => {
  app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
  });
};

mongoose.connect(DB_URL)
  .then(() => {
    console.log('Database access success!');
    listen();
  })
  .catch((err) => {
    console.log('Database access unsuccessful: ', err);
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/markers', markers);
app.use('/api/v1/users', users);
