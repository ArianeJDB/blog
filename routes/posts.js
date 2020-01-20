'use strict'

const express = require('express');
const posts = express.Router();
const postController = require('../controllers/posts')
const passport = require('passport');
const isPublisher =require('../src/isPublisher')
const isAdmin = require('../src/isAdmin')


posts.get('/posts', postController.getPosts) //sin auth
posts.get('/posts/:postId', postController.getOnePost) //sin auth

posts.post('/posts', passport.authenticate('jwt', { session: false }), isPublisher, postController.addNewPost) //auth sin validar nombre


posts.put('/posts/:postId', passport.authenticate('jwt', { session: false }), isPublisher, postController.editPost)
posts.delete('/posts/:postId',passport.authenticate('jwt', { session: false }), isPublisher, postController.deleteOnePost)
posts.delete('/posts/:postId/comments/:commentId', passport.authenticate('jwt', { session: false }), isPublisher, postController.deleteComment)
posts.put('/posts/:postId/comments/:commentId', passport.authenticate('jwt', { session: false }), isPublisher, postController.editComment)
posts.put('/posts', passport.authenticate('jwt', { session: false }), isAdmin, postController.deleteAllPosts) //solo admin


posts.post('/posts/:postId', passport.authenticate('jwt', { session: false }), isPublisher, postController.addComment) //auth sin validar nombre

module.exports = posts; 