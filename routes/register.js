'use strict'

const express = require('express');
const register = express.Router();
const registerController = require('../controllers/users')

register.post('/', registerController.createNewUser)

module.exports = register; 