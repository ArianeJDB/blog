'use strict'

const express = require('express');

const passport = require('passport');
const words = express.Router();
const wordsController = require('../controllers/words')
const isAdmin = require('../isAdmin')

words.get('/', passport.authenticate('jwt', { session: false }), isAdmin, wordsController.getWords)
words.post('/', passport.authenticate('jwt', { session: false }), isAdmin, wordsController.createNewWord)
words.put('/:id', passport.authenticate('jwt', { session: false }), isAdmin, wordsController.editWord)
words.delete('/:id', passport.authenticate('jwt', { session: false }), isAdmin, wordsController.deleteWord)

module.exports = words; 