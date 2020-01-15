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
    post.username = req.user.username;
    post.nickname = req.user.nickname;
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

        if (req.user.username === postUpdated.username) {
            res.status(200).send({ post: postUpdated })
        } else { res.status(403).send({ message: `Solo puedes editar un post escrito por ti: ${err}` }) }

    })
}


function deleteOnePost(req, res) {
    let postId = req.params.postId

    Post.findById(postId, (err, post) => {

        if (err) res.status(500).send({ message: `Error al borrar este post: ${err}` })

        post.remove(err => {
            if (err) res.status(500).send({ message: `Error al borrar este post: ${err}` })

            if (req.user.username === post.username) {
                res.status(200).send({ message: 'El post ha sido borrado' })
            } else { res.status(403).send({ message: `Solo puedes borrar un post escrito por ti: ${err}` }) }

        })

    })
}

function deleteComment(req, res) {

    let postId = req.params.postId
    let commentId = req.params.commentId
    let usernamePost;

    Post.findById(postId, (err, post) => {
        if (err) return res.status(500).send({ message: `Error al hacer la petición: ${err}` })
        if (!post) return res.status(404).send({ message: 'Este post no existe' })
        usernamePost = post.username

        Post.updateOne(
            { _id: postId },
            { $pull: { comments: { _id: commentId } } },
            { multi: true },
            (err) => {
                if (err) res.status(500).send({ message: `Error al borrar este comentario: ${err}` })
                if (usernamePost === req.user.username) {
                    res.status(200).send({ message: 'El comentario ha sido borrado' })
                } else {
                    res.status(403).send({ message: `Solo puedes borrar los comentarios de tu post: ${err}` })
                }
            }
        )
    })
}

async function addComment(req, res) {

    let postId = req.params.postId
    let comment = req.body.comments


    await comment.forEach(item => {
        let username = req.user.username;
        let nickname = req.user.nickname;
        item.nickname = nickname;
        item.username = username;

        const isValid = validator.validator(item.comment)

        if (isValid) {
            res.status(400).send({ message: `No puedes hacer comentarios con palabras ofensivas`, forbiddenWords })
        } else {

            Post.updateOne(

                { _id: postId },
                { $push: { comments: item } },
                { multi: true },
                (err) => {
                    if (err) res.status(500).send({ message: `Error al añadir este comentario: ${err}` })
                    res.status(200).send({ comments: comment })
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
        const nickname = item.nickname;
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