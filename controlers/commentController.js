'use strict'

// const Comment = require('../models/comment')
// //const date = new Date();

// //POST NEW COMMENT IN A POST
// function saveComment (req, res) {

//     let comment = new Comment();
//     comment.nickName = req.body.nickName;
//     comment.comment = req.body.comment;
//     comment.date = req.body.date
//     //comment._id = new ObjectID()

//     comment.save((err, comment) => {
//         if(err) res.status(500).send({message: `Error al enviar comentario: &{err}`})
//     })


//     res.status(200).send({ comment })
// }

// module.exports = {
//     saveComment
// }