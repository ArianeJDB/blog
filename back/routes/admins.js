'use strict'

const express = require('express');
const admins = express.Router();
const adminsController = require('../controllers/admins')


admins.get('/', adminsController.getAdmins)

module.exports = admins; 