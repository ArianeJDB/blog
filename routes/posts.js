'use strict'

const express = require('express');
const blog = express.Router();
const postController = require('../controllers/posts')
const passport = require('passport');
const isPublisher =require('../isPublisher')


blog.get('/posts', postController.getPosts) //sin auth
blog.get('/posts/:postId', postController.getOnePost) //sin auth

blog.post('/posts', passport.authenticate('jwt', { session: false }), isPublisher, postController.addNewPost) //auth sin validar nombre


blog.put('/posts/:postId', passport.authenticate('jwt', { session: false }), isPublisher, postController.editPost)
blog.delete('/posts/:postId',passport.authenticate('jwt', { session: false }), isPublisher, postController.deleteOnePost)
blog.delete('/posts/:postId/comments/:commentId', passport.authenticate('jwt', { session: false }), isPublisher, postController.deleteComment)
blog.put('/posts/:postId/comments/:commentId', passport.authenticate('jwt', { session: false }), isPublisher, postController.editComment)



blog.post('/posts/:postId', passport.authenticate('jwt', { session: false }), isPublisher, postController.addComment) //auth sin validar nombre

module.exports = blog; 