'use strict'

const jwt = require('jsonwebtoken');

// const SECRET_KEY = process.env.SECRETKEY;
const SECRET_KEY = 'SECRET_KEY'

module.exports = function login(req, res) {
    console.log('req',req.user)
    const { username } = req.user;

    const opts = { expiresIn: 600 };
    const token = jwt.sign({ username }, SECRET_KEY, opts);
    
    return res.status(200).json({ message: "Auth Passed", token });
}