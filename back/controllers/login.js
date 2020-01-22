'use strict'

const jwt = require('jsonwebtoken');

// const SECRET_KEY = process.env.SECRETKEY;
const SECRET_KEY = 'SECRET_KEY'

module.exports = function login(req, res) {
    console.log(req.user)
    const { username } = req.user;
    const userData = req.user

    const opts = { expiresIn: 30000 };
    const token = jwt.sign({ username }, SECRET_KEY, opts);
    
    return res.status(200).json({ message: "Auth Passed", token, userData });
}