'use strict'

const express = require('express');
const words = express.Router();
const wordsController = require('../controlers/wordsController')


// words.post('/', wordsController.createNewCollection)

words.get('/', wordsController.getWords)

words.post('/', wordsController.createNewWord)

words.put('/:id', wordsController.editWord)

words.delete('/:id',wordsController.deleteWord)

module.exports = words; 