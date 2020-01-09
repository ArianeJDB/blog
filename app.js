'use strict';

const express = require('express');
const bodyParser =  require('body-parser'); //parsearlo y tratarloomo un obj json deuna vez
const app = express();  
const blog = require('./routes/index')
const words = require('./routes/wordsRoute')

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



users.init();

//middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/blog', blog)
app.use('/words', words)

module.exports = app; 