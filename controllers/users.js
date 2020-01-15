'use strict';

const bcrypt = require('bcrypt');

const User = require('../models/users');
const Register = require('../models/register')

async function createNewUser(req, res) {
//registration
    let register = new Register();
    register.username = req.body.username;
    register.nickname = req.body.nickname;
    register.password = req.body.password;
    register.nickname = req.body.nickname
    register.rol = 'publisher';


    register.save((err, register) => {
        if (err) res.status(500).send({ message: `Error al registrarte: ${err}` })
    })

    res.status(200).send({ message: 'el usuario ha sido registrado', register })

    await addUser(register.username, register.password)

}

//login
async function addUser(username, password) {

    const passwordHash = await bcrypt.hash(password, bcrypt.genSaltSync(8), null);

    let user = await User.findOne({ username }).exec();

    if (!user) {
        user = new User({ username, passwordHash });
    } else {
        user.passwordHash = passwordHash;
    }

    await user.save();
}

// async function init () {

//    await createNewUser();
// }

async function find (username) {
    return await User.findOne({ username }).exec();
}

async function verifyPassword (user, password) {
    return await bcrypt.compare(password, user.passwordHash);
}

module.exports = {
    verifyPassword,
    find,
    // init,
    addUser,
    createNewUser
}