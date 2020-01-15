'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    username: String,
    nickname: String,
    passwordHash: String,
    role: String
});

module.exports = mongoose.model('Admin', AdminSchema)