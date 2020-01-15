'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    nickName: String,
    comment: String,
    date: { type: Date, default: Date.now },
    
})


const PostSchema = new Schema({
    username: String,
    nickname: String,
    title: String,
    text: String,
    comments: [CommentSchema]

})


module.exports = mongoose.model('Post', PostSchema)


    