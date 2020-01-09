'use strict'

const express = require('express');
const login = express.Router();
const loginController = require('../controlers/login')
const passport = require('passport');

login.post('/', passport.authenticate('basic', { session: false }), loginController)


module.exports = login; 