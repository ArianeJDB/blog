'use strict'

const mongoose = require('mongoose');
// const app = require('../app.js');
const fs = require('fs');
const https = require('https');
const admins = require('../controllers/admins')
const app = require('../app')
    
    mongoose.connect('mongodb://localhost:27017/blog', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    }, (err, res) => {

        if (err) {
            return console.log(`ERROR al conectar a la DDBB: ${err}`)
        }
        console.log('API REST Conectada a la DDBB')


      
     admins.getAdmins();

     
    })
    

