'use strict'

const express = require('express');
const blog = express.Router();
const postController = require('../controlers/posts')
const passport = require('passport');


blog.get('/posts', passport.authenticate('jwt', { session: false }), postController.getPosts)
blog.get('/posts/:postId', postController.getOnePost)
blog.post('/posts', postController.addNewPost)
blog.put('/posts/:postId', postController.editPost)
blog.delete('/posts/:postId',postController.deleteOnePost)
blog.delete('/posts/:postId/comments/:commentId', postController.deleteComment)
blog.post('/posts/:postId', postController.addComment)
blog.put('/posts/:postId/comments/:commentId', postController.editComment)

module.exports = blog; 