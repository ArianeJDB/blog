'use strict';

const express = require('express');
const bodyParser =  require('body-parser'); //parsearlo y tratarloomo un obj json deuna vez
const app = express();  
const blog = require('./routes/index')
const words = require('./routes/wordsRoute')

//middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/blog', blog)
app.use('/words', words)

module.exports = app; 