'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let User;

async function createSampleUsers() {
    await addUser('paquita', 'salas');
    
}

async function addUser(username, password) {
    const passwordHash = await bcrypt.hash(password, bcrypt.genSaltSync(8), null);

    let user = await User.findOne({ username }).exec();

    if(!user){
        user = new User({ username, passwordHash });
    } else { 
        user.passwordHash = passwordHash;
    }

    await user.save();
}

exports.init = async function() {
   
    User = mongoose.model('User', new mongoose.Schema({
        username: String,
        passwordHash: String
    }));

    createSampleUsers();
}

exports.find = async function (username) {
    return await User.findOne({ username }).exec();
}

exports.verifyPassword = async function (user, password) {
    return await bcrypt.compare(password, user.passwordHash);
}
