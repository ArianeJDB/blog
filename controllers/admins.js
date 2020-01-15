'use strict';

const Admin = require('../models/admins')
const admins = require('../admins')



function createAdminsCollection (req, res) {
    
    Admin.create(admins, (err) => {
        console.log('se crea admin collection')
        if (err) return res.status(500).send({ message: `Error al hacer la petición: ${err}` })
    })
}
    

function getAdmins(req, res) {
    
    Admin.find({}, (err, admin) => {

        if (err) return res.status(500).send({ message: `Error al hacer la petición: ${err}` })

        if (!admin) {
            console.log('no hay')
            return res.status(404).send({ message: 'no hay administradores' })}

        if (admin.length === 0) createAdminsCollection();

       
        //res.status(200).send({ admin })

    })
}

module.exports = {
    getAdmins
}