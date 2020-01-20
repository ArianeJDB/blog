/**
 * @jest-environment node
 */

const mongoose = require('mongoose');
const app = require('../app')
const supertest = require('supertest')
const Post = require('../models/post');

let request = supertest(app);
let tokenAdmin;
let tokenPublisher;
let postId;
let newPost = {
    title: 'titulo a mi post',
    text: 'contenido de mi post'
};


test('rejects create post without auth', async (done) => {

    await request.post('/blog/posts')
        .send(newPost)
        .expect(401)

    done();

});

describe('posts methods', () => {
    beforeAll(async (done) => {
        await mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });

        const responsePublisher = await request
            .post('/login')
            .auth('jax', 'hola')
   
        tokenPublisher = responsePublisher.body.token

        const responseAdmin = await request
            .post('/login')
            .auth('ari', 'ane');
        tokenAdmin = responseAdmin.body.token

        const response = await request.post('/blog/posts')
        .set('Accept', 'application/json')
        .set('Authorization', 'bearer ' + tokenPublisher)
        .send(newPost);

        postId = response.body.post._id;

    done();
    });

    
    test('should post a new post as a publisher role', async (done) => {

        const response = await request.post('/blog/posts')
            .set('Accept', 'application/json')
            .set('Authorization', 'bearer ' + tokenPublisher)
            .send(newPost)
            .expect('Content-type', /json/)
            .expect(200)

        postId = response.body.post._id;
        expect(postId).toBeTruthy();
        expect(response.body.post.text).toBe(newPost.text);

        done();

    })

})

describe('add comments methods', () => {

    test('should add comment(w/o offensive words)', async () => {
        comment = {
            "comments": [
                {
                    "comment": "hola, qué tal"
                }
            ]
        }

        const response = await request.post('/blog/posts/' + postId)
            .set('Accept', 'application/json')
            .set('Authorization', 'bearer ' + tokenAdmin)
            .send(comment)
            .expect('Content-Type', /json/)
            .expect(200);

        response.body.comments.forEach(item => {
           
            expect(item.comment).toBeTruthy();
            expect(item.nickname).toBeTruthy();
            expect(item.username).toBeTruthy();
        })

    })

    test('rejects comment with offensive words', async () => {
        offensiveComment = {
            "comments": [
                {
                    "comment": "hola, gilipollas"
                }
            ]
        }

        const response = await request.post('/blog/posts/' + postId)
            .set('Accept', 'application/json')
            .set('Authorization', 'bearer ' + tokenAdmin)
            .send(offensiveComment)
            .expect('Content-Type', /json/)
            .expect(403);

            const forbidden = '{"message":"No puedes hacer comentarios con palabras ofensivas","forbiddenWords":{"forbiddenWords":[{"word":"gilipollas","level":4}]}}'
            expect(response.text).toBe(forbidden)
  

    })
    test('should delete posts that posted in test as an Admin', async (done) => {
        
        await request.delete('/blog/posts/' + postId)
        .set('Authorization', 'bearer ' + tokenAdmin)
        .expect('Content-type', /json/)
        .expect(200)

    done();
    })

})
afterAll(async done => {

    mongoose.connection.close();
    done();
});