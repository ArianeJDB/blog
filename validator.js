'use strict'


// const defaultWords = require('./defaultWords')
const defaultWords = require('./defaultWords');
const editPost = require('./controlers/controller')

module.exports = (comment) => {


    defaultWords.forEach((word)=>{
        const isIncluded = comment.includes(word.word);
       if(isIncluded){
           return true
       }
        
        
    })
}

//exports.validateComments = validateComments