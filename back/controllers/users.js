'use strict';

const bcrypt = require('bcrypt');

const User = require('../models/users');
const Register = require('../models/register')
const Admin = require('../models/admins')

const admins = require('../src/admins')

function createNewUser(req, res) {
//registration
    let register = new Register();
    register.username = req.body.username;
    register.nickname = req.body.nickname;
    register.password = req.body.password;
    register.nickname = req.body.nickname
    register.role = 'publisher';


    register.save((err, register) => {
        if (err) res.status(500).send({ message: `Error al registrarte: ${err}` })
    })

    res.status(200).send({ message: 'el usuario ha sido registrado', register })
    addUser(register.username, register.password, register.role, register.nickname)

}
addUser(admins.username, admins.password, admins.role, admins.nickname)

//login
async function addUser(username, password, role, nickname) {
    const passwordHash = await bcrypt.hash(password, bcrypt.genSaltSync(8), null);

    let user = await User.findOne({ username }).exec();

    if (!user) {
        user = new User({ username, passwordHash, role, nickname});
    } else {
        user.passwordHash = passwordHash;
    }

    await user.save();
}

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
    //addUser,
    createNewUser,
    // addAdmin
}