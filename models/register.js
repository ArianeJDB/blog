'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegisterSchema = new Schema({
    userName: String,
    nickName: String,
    rol: String
})


module.exports = mongoose.model('Register', RegisterSchema)