//index.js
blog.get('/posts', passport.authenticate('basic', { session: false }),

//en repository.js

'use strict'

const mongoose = require ('mongoose');
const app = require('./app.js')
const fs = require('fs');
const https = require('https');

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

const users = require('./users');

async function verify(username, password, done) {

    var user = await users.find(username);

    if(!user){
        return done(null, false, { message: 'User not found' });
    }

    if(await users.verifyPassword(user, password)){
        return done(null, user);
    } else {
        return done(null, false, { message: 'Incorrect password' });
    }
}

passport.use(new BasicStrategy(verify));

app.use(passport.initialize());

mongoose.connect('mongodb://localhost:27017/blog', (err, res) => {
    if(err) {
        return console.log(`ERROR al conectar a la DDBB: ${err}`)
    }

   

    console.log('API REST Conectada a la DDBB')

    https.createServer({
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.cert')
    }, app).listen(3443, () =>{
        console.log('https CONECTADO')
    })

users.init();

    // app.listen(3000, () => {
    //     console.log(`ESCUCHANDING en puerto 3000`)
    // })
})
