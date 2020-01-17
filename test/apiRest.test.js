/**
 * @jest-environment node
 */

const app = require('../app')
const supertest = require('supertest')

let request;

beforeAll(() => {
    request = supertest(app);
});

test('when create new POST then canT', async (done) => {
    var newPost = {
        title: 'Learn About Something',
        text: 'Lets learn guys. Im going to explain you how.'
    };

    const { body } = await request.post('/blog/posts')
        .send(newPost)
        .expect(401)

    done();

});
