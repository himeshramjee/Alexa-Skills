require('dotenv').config();

const path = require('path');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded, i.e. form posts
app.use(express.json()); // for parsing application/json

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var alexaRouter = require('./routes/alexa-router');
var alexaPingRouter = require('./routes/alexa-ping-router');
app.use('/alexa', alexaRouter);
app.use('/alexa', alexaPingRouter);
app.use('/alexa', express.static(path.join(__dirname, 'public')));

app.on('listening', () => {
  console.log();
  console.log('🚀 Noddyx Server is up!!');
  console.log();
});


module.exports = app;