'use strict'

const defaultWords = require('./defaultWords');

module.exports = (comment) => {

    let isIncluded = false

    defaultWords.forEach((word) => {

        if (comment.includes(word.word)) {
            isIncluded = true
        }
    })

    return isIncluded;

}
