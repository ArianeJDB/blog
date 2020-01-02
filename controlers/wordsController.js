'use strict'


const Words = require('../models/words');

const defaultWords = require('../defaultWords')


function createNewCollection (req, res) {
   Words.create(defaultWords, (err) =>{
    if(err) return res.status(500).send({message: `Error al hacer la petición: ${err}`})


    res.status(200).send({ defaultWords })
}) 
}

function getWords (req, res) {
    Words.find({}, (err, words) => {
        if(err) return res.status(500).send({message: `Error al hacer la petición: ${err}`})

        if(!words) return res.status(404).send({message: 'no hay palabras'})

        if(words.length === 0) return createNewCollection()
      
        res.status(200).send({ words })
})
}

function createNewWord (req, res) {
   

    let word = new Words();
    word.word = req.body.word;
    word.level = req.body.level;
   

    word.save((err, word) => {
        if(err) res.status(500).send({message: `Error al enviar palabra: ${err}`})
    })

    res.status(200).send({ word }) 
}

function editWord (req, res)  {
    //edit title and text
    let id = req.params.id;
    let wordUpdated = req.body;

    Words.findByIdAndUpdate(id, wordUpdated, (err, updated) => {
        if(err) res.status(500).send({message: `Error al editar la palabra: ${err}`})

        res.status(200).send({ post: updated })
    })
}

function deleteWord (req, res) {
    let id = req.params.id

    Words.findById(id, (err, word) => {
        if(err) res.status(500).send({message: `Error al borrar esta palabra: ${err}`})
                word.remove(err => {
                if(err) res.status(500).send({message: `Error al borrar esta palabra: ${err}`})

                res.status(200).send({message: 'La palabra ha sido borrada'})
            }) 
            
    })
}


module.exports = {
    getWords,
    createNewWord,
    editWord,
    deleteWord,
    // createNewCollection

    
}