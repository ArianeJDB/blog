'use strict'


const defaultWords = require('./defaultWords')

function no(){
    defaultWords.forEach((word)=>{
        const is = comment.includes(word.word);

        if(is){
            return true
        }
    })
}

module.exports={no}