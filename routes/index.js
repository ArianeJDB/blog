'use strict'

const express = require('express');
const api = express.Router();
const postController = require('../controlers/postController')
const commentController = require('../controlers/commentController')

api.get('/posts', postController.getPosts)
api.get('/posts/:postId', postController.getOnePost)
api.post('/posts', postController.savePost)
api.put('/posts/:postId', postController.editPost)
api.delete('/posts/:postId',postController.deleteOnePost)
//api.post('/posts/comments', commentController.saveComment)
api.put('/posts/:postId', postController.newComment)
module.exports = api;