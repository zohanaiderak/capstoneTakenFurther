const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8080;
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const phoneRoutes = require("./phoneRoutes");
const accessoryRoutes = require("./accessoryRoutes");
const send = require('./send');
const upload = require('./multer');
const contact = require('./contact');
var path = require('path');

app.use(cors());

app.use(express.json());

app.use(bodyParser.json());

app.use(express.static('assets'));

app.use(express.static(path.join(__dirname , '/client/build')));

app.use('/api/phone', phoneRoutes );

app.use('/api/accessor' , accessoryRoutes);

app.use('/api/send' , send);

app.use('/api/contact' , contact)

app.use('/api/upload', upload );

mongoose.connect(
  process.env.MONGODB_CONN,
  { useNewUrlParser: true , useUnifiedTopology: true },
  ()=>{
  console.log("connected to db!")
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
