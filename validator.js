'use strict'

const defaultWords = require('./defaultWords');
let forbiddenWords = []
const validator = (comment) => {

    let isIncluded = false;

    defaultWords.forEach((word) => {

        if (comment.includes(word.word)) {
            
            forbiddenWords.push(word)
            
            isIncluded = true
        }
    })
//console.log('qqqqqqqq',forbiddenWords)
    return isIncluded;

}


module.exports = {
    validator,
    forbiddenWords
}