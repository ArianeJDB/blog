'use strict'

const defaultWords = require('../src/defaultWords');
let forbiddenWords = []
const validator = (comment) => {

    let isIncluded = false;

    defaultWords.forEach((word) => {
        const commetToLowerCase = comment.toLowerCase();
        if (commetToLowerCase.includes(word.word)) {
            forbiddenWords.push(word)
            isIncluded = true
        }
    })

    return isIncluded;
}

module.exports = {
    validator,
    forbiddenWords
}