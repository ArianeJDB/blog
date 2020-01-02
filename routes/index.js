'use strict'

const express = require('express');
const blog = express.Router();
const postController = require('../controlers/controller')



blog.get('/posts', postController.getPosts)
blog.get('/posts/:postId', postController.getOnePost)
blog.post('/posts', postController.savePost)
blog.put('/posts/:postId', postController.editPost)
blog.delete('/posts/:postId',postController.deleteOnePost)
blog.delete('/posts/:postId/comments/:commentId', postController.deleteComment)

module.exports = blog; 