const validator = require('../validator');
const defaultWords = require('../defaultWords')

describe('validator', () => {
    test('validates if comments has forbidden words', () => {
        const comment = 'hola gilipollas';
        const offensiveWords = defaultWords;
        const input = validator.validator(comment, offensiveWords)

        expect(input).toBeTruthy();

    });
    test('validates if comments doesnt have forbidden words', () => {
        const comment = 'hola';
        const offensiveWords = defaultWords;
        const input = validator.validator(comment, offensiveWords)

        expect(input).toBeFalsy();

    })
});