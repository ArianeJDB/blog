'use strict'

const express = require('express');
const api = express.Router();
const postController = require('../controlers/controller')


api.get('/posts', postController.getPosts)
api.get('/posts/:postId', postController.getOnePost)
api.post('/posts', postController.savePost)
api.put('/posts/:postId', postController.editPost)
api.delete('/posts/:postId',postController.deleteOnePost)
api.delete('/posts/:postId',postController.deleteComment)

module.exports = api; 