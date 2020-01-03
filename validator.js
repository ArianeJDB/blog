'use strict'


// const defaultWords = require('./defaultWords')
const defaultWords = require('./defaultWords');

module.exports = (comment) => {
    //console.log('LLEGAAAA',comment)
    // defaultWords.forEach(word => console.log(word))

    defaultWords.forEach((word)=>{
        const isIncluded = comment.includes(word.word);

        if(isIncluded){
            console.log('YEAH BABY')
        }else{
            console.log('NOBABYYY')
        }
    })
}

//exports.validateComments = validateComments