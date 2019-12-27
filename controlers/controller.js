'use strict'

const Post = require('../models/post');



function getPosts (req, res) {
    //GET ALL BUT COMMENTS DONE
    Post.find({}, {comments:0}, (err, posts) => {
        
        if(err) return res.status(500).send({message: `Error al hacer la petición: ${err}`})
        if(!posts) return res.status(404).send({message: 'no hay posts'})

        res.status(200).send({ posts })
})
}

//GET ONE WITH COMMENTS DONE
function getOnePost (req, res) {
    let postId = req.params.postId

    Post.findById(postId, (err, post) => {
        if(err) return res.status(500).send({message: `Error al hacer la petición: ${err}`})
        if(!post) return res.status(404).send({message: 'Este post no existe'})

        res.status(200).send({ post }) //destructuring porque clave y value se llaman igual
    })
}

//PUT POST, EDIT IT
function editPost (req, res)  {
    let postId = req.params.postId;
    let bodyUpdated = req.body
    
    Post.findByIdAndUpdate(postId, bodyUpdated, (err, postUpdated) => {
        if(err) res.status(500).send({message: `Error al editar este post: ${err}`})

        res.status(200).send({ post: postUpdated })
    })
}


//POST NEW ENTIRE POST SIN COMENTARIOS
function savePost (req, res) {
    // console.log('post /api/posts')
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


 
//DELETE ONE POST
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

//DELETE ONE COMMENT
function deleteComment (req, res) {
    let postId = req.params.postId

    Post.findOneAndUpdate(postId, { $pull: {"comments": { _id: commentId}}},(err, post) => {
        if(err) res.status(500).send({message: `Error al borrar este post: ${err}`})

    //     post.remove(err => {
    //         if(err) res.status(500).send({message: `Error al borrar este post: ${err}`})

            res.status(200).send({message: 'El post ha sido borrado'})
        })
    }
    //)

    // Post.findOneAndUpdate(postId, {$pull: {comments: { _id: id }}}, function(err, data){
    //     if(err) {
    //         return res.status(500).json({"error":"no se pudo borrar"});
    //     } 
    //     res.json(data)
    // })
     
// }
 

module.exports = {
    getPosts,
    getOnePost,
    editPost,
    savePost,
    deleteOnePost,
    deleteComment
    

    
}