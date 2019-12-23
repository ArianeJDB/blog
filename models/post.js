'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema({
    userName: String,
    textBody: String,

})

module.exports = mongoose.model('Post', PostSchema)