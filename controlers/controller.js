'use strict'

//const validateComments = require('../validator.js')
const Post = require('../models/post');
const validator = require('../validator');



function getPosts (req, res) {
    Post.find({}, {comments:0}, (err, posts) => {
        
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

        res.status(200).send({ post })
    })
}


//POST NEW ENTIRE POST SIN COMENTARIOS
function savePost (req, res) {
   
    // console.log('REQ.BODY---------------->',req.body);

    let post = new Post();
    post.userName = req.body.userName;
    post.nickName = req.body.nickName;
    post.title = req.body.title;
    post.text = req.body.text;
    post.comments = req.body.comments
    

    post.save((err, post) => {
        if(err) res.status(500).send({message: `Error al enviar post: &{err}`})
    })

    res.status(200).send({ post }) 
}


function editPost (req, res)  {
    //edit title and text
    let postId = req.params.postId;
    let bodyUpdated = req.body;

    Post.findByIdAndUpdate(postId, bodyUpdated, (err, postUpdated) => {

        if(err) res.status(500).send({message: `Error al editar este post: ${err}`})
        
        bodyUpdated.comments.forEach(comment => validator(comment.comment))
        
        if(validator){
            console.log('algoppooooo')
            res.status(500).send({message: `No puedes incluir palabras ofensivas en el comentario: ${err}`})
        }

        res.status(200).send({ post: postUpdated })
        
    })
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


function deleteComment (req, res) {

    let postId = req.params.postId
    let commentId = req.params.commentId

    Post.update(
        {_id: postId},
        { $pull: {comments: {_id: commentId}}},
        {multi: true},
        (err) =>{
            if(err) res.status(500).send({message: `Error al borrar este comentario: ${err}`})
            res.status(200).send({message: 'El comentario ha sido borrado'})
        }

    )
     

 
}



module.exports = {
    getPosts,
    getOnePost,
    editPost,
    savePost,
    deleteOnePost,
    deleteComment
    
}