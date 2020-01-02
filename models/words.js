'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordsSchema = new Schema({
    word: String,
    level: Number
})


module.exports = mongoose.model('Words', WordsSchema)