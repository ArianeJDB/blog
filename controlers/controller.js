'use strict'

const Post = require('../models/post');


function getPosts (req, res) {
    Post.find({}, (err, posts) => {
        
        if(err) return res.status(500).send({message: `Error al hacer la petición: ${err}`})
        if(!posts) return res.status(404).send({message: 'no hay posts'})

        res.status(200).send({ posts })
})
}

function getOnePost (req, res) {
    let postId = req.params.postId

    Post.findById(postId, (err, post) => {
        if(err) return res.status(500).send({message: `Error al hacer la petición: ${err}`})
        if(!post) return res.status(404).send({message: 'Este post no existe'})

        res.status(200).send({ post }) //destructuring porque clave y value se llaman igual
    })
}

function editPost (req, res)  {
    let postId = req.params.postId;
    let bodyUpdated = req.body
    Post.findByIdAndUpdate(postId, bodyUpdated, (err, postUpdated) => {
        if(err) res.status(500).send({message: `Error al editar este post: ${err}`})

        res.status(200).send({ post: postUpdated })
    })
}

function savePost (req, res) {
    console.log('post /api/posts')
    console.log(req.body);

    let post = new Post();
    post.userName = req.body.userName;
    post.nickName = req.body.nickName;
    post.title = req.body.title;
    post.text = req.body.text;

    post.save((err, post) => {
        if(err) res.status(500).send({message: `Error al enviar post: &{err}`})
    })

    //res.send(200,{message: 'Se ha publicado tu post'}) DEPRECATED

    res.status(200).send({post: post})
}

function deleteOnePost (req, res) {
    let postId = req.params.postId

    Post.findById(postId, (err, post) => {
        if(err) res.status(500).send({message: `Error al borrar este post: ${err}`})

        post.remove(err => {
            if(err) res.status(500).send({message: `Error al borrar este post: ${err}`})

            res.status(200).send({message: 'El post ha sido borrado'})
        })
    })
}

module.exports = {
    getPosts,
    getOnePost,
    editPost,
    savePost,
    deleteOnePost
}