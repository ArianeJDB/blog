'use strict'

const Post = require('../models/post');
const validator = require('../validator');
const forbiddenWords = require('../validator');


function getPosts(req, res) {
    Post.find({}, { comments: 0 }, (err, posts) => {

        if (err) return res.status(500).send({ message: `Error al hacer la petición: ${err}` })
        if (!posts) return res.status(404).send({ message: 'no hay posts' })

        res.status(200).send({ posts })
    })
}


function getOnePost(req, res) {
    let postId = req.params.postId

    Post.findById(postId, (err, post) => {
        if (err) return res.status(500).send({ message: `Error al hacer la petición: ${err}` })
        if (!post) return res.status(404).send({ message: 'Este post no existe' })

        res.status(200).send({ post })
    })
}


function addNewPost(req, res) {

    let post = new Post();
    post.username = req.body.username;
    post.nickname = req.body.nickname;
    post.title = req.body.title;
    post.text = req.body.text;

    post.save((err, post) => {
        if (err) res.status(500).send({ message: `Error al enviar post: &{err}` })
    })

    res.status(200).send({ post })
}


function editPost(req, res) {

    let postId = req.params.postId;
    let bodyUpdated = req.body;

    Post.findByIdAndUpdate(postId, bodyUpdated, (err, postUpdated) => {

        if (err) {
            res.status(500).send({ message: `Error al editar este post: ${err}` })
        }
        res.status(200).send({ post: postUpdated })
    })
}


function deleteOnePost(req, res) {
    let postId = req.params.postId

    Post.findById(postId, (err, post) => {
        if (err) res.status(500).send({ message: `Error al borrar este post: ${err}` })
        post.remove(err => {
            if (err) res.status(500).send({ message: `Error al borrar este post: ${err}` })

            res.status(200).send({ message: 'El post ha sido borrado' })
        })

    })
}

function deleteComment(req, res) {

    let postId = req.params.postId
    let commentId = req.params.commentId


    Post.updateOne(
        { _id: postId },
        { $pull: { comments: { _id: commentId } } },
        { multi: true },
        (err) => {
            if (err) res.status(500).send({ message: `Error al borrar este comentario: ${err}` })
            res.status(200).send({ message: 'El comentario ha sido borrado' })
        }
    )
}

function addComment(req, res) {
    let postId = req.params.postId
    let comment = req.body.comments
    
    comment.forEach(item => {
        const nickname = item.nickName;
        const isValid = validator.validator(item.comment)

        if (isValid) {
            res.status(400).send({ message: `No puedes hacer comentarios con palabras ofensivas`, forbiddenWords })
        } else {
            Post.updateOne(

                { _id: postId },
                { $push: { comments: comment, nickname } },
                { multi: true },
                (err) => {
                    if (err) res.status(500).send({ message: `Error al añadir este comentario: ${err}` })
                    res.status(200).send({ post: comment })
                }
            )
        }
    }
    )
}

function editComment(req, res) {
    let postId = req.params.postId
    let commentId = req.params.commentId
    let comment = req.body.comments

    comment.forEach(item => {
        const nickname = item.nickName;
        const isValid = validator.validator(item.comment)

        if (isValid) {
            res.status(400).send({ message: `No puedes hacer comentarios con palabras ofensivas`, forbiddenWords })
        } else {

            Post.updateOne(
                { _id: postId, 'comments._id': commentId },
                { $set: { 'comments.$': comment, nickname } }, function (err) {
                    if (err) res.status(500).send({ message: `Error al editar este comentario: ${err}` })
                    res.status(200).send({ message: 'El comentario ha sido editado' })

                }
            )
        }
    })
}


module.exports = {
    getPosts,
    getOnePost,
    editPost,
    addNewPost,
    deleteOnePost,
    deleteComment,
    addComment,
    editComment

}