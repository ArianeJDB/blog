'use strict';

const express = require('express');
const bodyParser =  require('body-parser'); //parsearlo y tratarloomo un obj json deuna vez
const mongoose = require ('mongoose');

const Post = require('./models/post');

const app = express(); // app es donde tenemos nuestra applicación de express
const port = 3000;

//middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/posts', (req, res) => {
    Post.find({}, (err, posts) => {
        
        if(err) return res.status(500).send({message: `Error al hacer la petición: ${err}`})
        if(!posts) return res.status(404).send({message: 'no hay posts'})

        res.send(200, { posts })
})
})


//pedir info de un post específico con su ID
app.get('/api/posts/:postId', (req, res) => {
    let postId = req.params.postId

    Post.findById(postId, (err, post) => {
        if(err) return res.status(500).send({message: `Error al hacer la petición: ${err}`})
        if(!post) return res.status(404).send({message: 'Este post no existe'})

        res.status(200).send({ post }) //destructuring porque clave y value se llaman igual
    })
})

app.post('/api/posts', (req, res) => {
    console.log('post /api/posts')
    console.log(req.body);

    let post = new Post();
    post.userName = req.body.userName;
    post.textBody = req.body.textBody;

    post.save((err, post) => {
        if(err) res.status(500).send({message: `Error al enviar post: &{err}`})
    })

    //res.send(200,{message: 'Se ha publicado tu post'}) DEPRECATED

    res.status(200).send({post: post})


})

app.put('/api/posts/:postId', (req, res) => {
    let postId = req.params.postId;
    let bodyUpdated = req.body
    Post.findByIdAndUpdate(postId, bodyUpdated, (err, postUpdated) => {
        if(err) res.status(500).send({message: `Error al editar este post: ${err}`})

        res.status(200).send({ post: postUpdated })
    })
})

app.delete('/api/posts/:postId', (req, res) => {
    let postId = req.params.postId

    Post.findById(postId, (err, post) => {
        if(err) res.status(500).send({message: `Error al borrar este post: ${err}`})

        post.remove(err => {
            if(err) res.status(500).send({message: `Error al borrar este post: ${err}`})

            res.status(200).send({message: 'El post ha sido borrado'})
        })
    })
})

mongoose.connect('mongodb://localhost:27017/blog', (err, res) => {
    if(err) {
        return console.log(`ERROR al conectar a la DDBB: ${err}`)
    }
    console.log('API REST Conectada a la DDBB')

    app.listen(3000, () => {
        console.log(`ESCUCHANDING en ${port}`)
    })
})

