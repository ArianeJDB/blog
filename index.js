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
    //compruebas en postman o en navegador el localhost:3000/hola la ruta que le he puesto y debe salir lo que le metí como mensaje
    //res.send(200, {posts: []})DEPRECATED
    res.status(200).send({posts: []})
})

app.get('/api/posts/:postId', (req, res) => {

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

})

app.delete('/api/posts/:postId', (req, res) => {

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

