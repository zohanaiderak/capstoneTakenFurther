const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT  || 8080;
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const phoneRoutes = require("./phoneRoutes");
const accessoryRoutes = require("./accessoryRoutes");
const send = require('./send');
const upload = require('./multer');
const contact = require('./contact');
const fs = require('fs');
var path = require('path');

app.use(cors());

app.use(express.json());

app.use(bodyParser.json());

app.use(express.static('assets'));

app.use('/phones', phoneRoutes );

app.use('/accessories' , accessoryRoutes);

app.use('/send' , send);

app.use('/contact' , contact)

app.use('/upload', upload );

mongoose.connect(
  process.env.MONGODB_CONN,
  { useNewUrlParser: true , useUnifiedTopology: true },
  ()=>{
  console.log("connected to db!")
})

app.use(express.static(__dirname + '../build'));

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
