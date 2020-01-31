'use strict';

const Admin = require('../models/admins')
const admins = require('../src/admins')

function createAdminsCollection (req, res) { 
    Admin.create(admins, (err) => {
        if (err) return res.status(500).send({ message: `Error al hacer la petición: ${err}` })
    })
}
    

function getAdmins(req, res) {
    
    Admin.find({}, (err, admin) => {

        if (err) return res.status(500).send({ message: `Error al hacer la petición: ${err}` })

        if (!admin) {
            return res.status(404).send({ message: 'no hay administradores' })}

        if (admin.length === 0) createAdminsCollection();

    })
}

module.exports = {
    getAdmins
}