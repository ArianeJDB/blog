'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema({
    userName: String,
    nickName: String,
    title: String,
    text: String,

})

module.exports = mongoose.model('Post', PostSchema)