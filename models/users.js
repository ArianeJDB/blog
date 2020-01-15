'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    nickname: String,
    passwordHash: String,
    rol: String

})


module.exports = mongoose.model('User', UserSchema)