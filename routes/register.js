'use strict'

const express = require('express');
const register = express.Router();
const registerController = require('../controllers/register')

register.post('/', registerController.createNewUser)

// words.get('/', wordsController.getWords)

// words.post('/', wordsController.createNewWord)

// words.put('/:id', wordsController.editWord)

// words.delete('/:id',wordsController.deleteWord)

module.exports = register; 