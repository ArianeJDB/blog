/**
 * @jest-environment jsdom
 */

const app = require('../appserver')
const supertest = require('supertest')

const request = supertest(app)

test('when get all ads then get test adds', async () => {
    
    

})

test('when get all ads then get test adds', async () => {
 
    const response = await request.get('/posts')
        // .expect('Content-type', /json/)
        .expect(200)

    // expect(body[0].username).toBeTruthy();
    // expect(body[0].nickname).toBeTruthy();
    // expect(body[0].title).toBeTruthy();
    // expect(body[0].text).toBeTruthy();
    // expect(body[0]._id).toBeTruthy();
 

})


module.exports = {
    testEnvironment: 'node'
  };