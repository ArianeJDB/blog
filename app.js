'use strict';

const express = require('express');
const bodyParser =  require('body-parser'); //parsearlo y tratarloomo un obj json deuna vez
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require("jsonwebtoken");

const blog = require('./routes/postsRoute')
const words = require('./routes/wordsRoute')

const app = express();

const SECRET_KEY = "SECRET_KEY" //normally store this in process.env.secret

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

app.post("/login", 
    passport.authenticate('basic', { session: false }),
    (req, res) => {
    
        const { username } = req.user;

        const opts = { expiresIn: 600 }; //token expires in 10min
        const token = jwt.sign({ username }, SECRET_KEY, opts);
        
        return res.status(200).json({ message: "Auth Passed", token });

});

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY
}

passport.use(new JwtStrategy(jwtOpts, async (payload, done) => {
    
    var user = await users.find(payload.username);
    
    if (user) {
        return done(null, user);
    } else {
        return done(null, false, { message: 'User not found' });
    }
    
}) );




users.init();

//middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/blog', blog)
app.use('/words', words)

module.exports = app; 