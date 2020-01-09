'use strict'

const mongoose = require ('mongoose');
const app = require('../app.js');
const fs = require('fs');
const https = require('https');

mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true },(err, res) => {
    if(err) {
        return console.log(`ERROR al conectar a la DDBB: ${err}`)
    }
    console.log('API REST Conectada a la DDBB')

    https.createServer({
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.cert')
    }, app).listen(3443, () =>{
        console.log('CONECTADO a https 3443')
    })

    // app.listen(3000, () => {
    //     console.log(`ESCUCHANDING en puerto 3000`)
    // })
})