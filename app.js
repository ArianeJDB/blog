'use strict';

const express = require('express');
const bodyParser =  require('body-parser');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const blog = require('./routes/posts')
const words = require('./routes/words')
const login = require('./routes/login')
const register = require('./routes/register')
const users = require('./controllers/users');

// const SECRET_KEY = process.env.SECRETKEY;
const SECRET_KEY = 'SECRET_KEY'

const app = express();

async function verify(username, password, done) {

    let user = await users.find(username);

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

// app.post("/login", 
//     passport.authenticate('basic', { session: false }),
//     (req, res) => {
        
//         const { username } = req.user;

//         const opts = { expiresIn: 600 };
//         const token = jwt.sign({ username }, SECRET_KEY, opts);
        
//         return res.status(200).json({ message: "Auth Passed", token });

// });

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY
}

passport.use(new JwtStrategy(jwtOpts, async (payload, done) => {
    
    const user = await users.find(payload.username);
    
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
app.use('/login', login)
app.use('/register', register)

module.exports = app; 