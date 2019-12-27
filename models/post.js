'use strict';

const mongoose = require('mongoose');


const Schema = mongoose.Schema;
//const Comment = require('./comment')

const CommentSchema = new Schema({
    nickName: String,
    comment: String,
    date: { type: Date, default: Date.now }
})


const PostSchema = new Schema({
    userName: String,
    nickName: String,
    title: String,
    text: String,
    comments: [CommentSchema]

})


module.exports = mongoose.model('Post', PostSchema)
//module.exports = mongoose.model('Comment', CommentSchema)

    