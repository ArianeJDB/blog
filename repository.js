'use strict'

const mongoose = require ('mongoose');
const app = require('./app.js')

mongoose.connect('mongodb://localhost:27017/blog', (err, res) => {
    if(err) {
        return console.log(`ERROR al conectar a la DDBB: ${err}`)
    }
    console.log('API REST Conectada a la DDBB')

    app.listen(3000, () => {
        console.log(`ESCUCHANDING en puerto 3000`)
    })
})
