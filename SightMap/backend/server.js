const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const username = 'sanderzhanni';
const password = '3o72qMrQbD4g8tWs'; //Proccess.env later

const index = require('./routes/index');
const markers = require('./routes/markers');

const app = express();
let PORT = 3000;
const DB_URL = `mongodb+srv://` + username + `:` + password + `@rakprog-aq8p2.mongodb.net/` + process.env.DB_NAME + `?retryWrites=true&w=majority`;

const listen = () =>{
    app.listen(PORT, ()=>{
        console.log("Server is running on port:", PORT)
    });
};

mongoose.connect(DB_URL)
    .then(() => {
        console.log("Database access success!");
        listen();
    })
    .catch((err) => {
        console.log("Database access unsuccessful: ", err);
    });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", index);
app.use('/api/v1', markers);
