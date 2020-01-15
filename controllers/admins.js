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

function createNewAdmin(req, res) {

    let admin = new Admin();
    admin.username = req.body.username;
    admin.nickname = req.body.nickname;
    admin.rol = 'admin'


    admin.save((err, admin) => {
        if (err) res.status(500).send({ message: `Error al enviar palabra: ${err}` })
    })

    res.status(200).send({ admin })
}

function editAdmin(req, res) {
    let id = req.params.id;
    let updated = req.body;

    Admin.findByIdAndUpdate(id, updated, (err, updated) => {
        if (err) res.status(500).send({ message: `Error al editar al usuario: ${err}` })

        res.status(200).send({ updated })
    })
}

function deleteAdmin(req, res) {
    let id = req.params.id

    Admin.findById(id, (err, admin) => {
        if (err) res.status(500).send({ message: `Error al borrar este usuario: ${err}` })
        admin.remove(err => {
            if (err) res.status(500).send({ message: `Error al borrar este usuarioa: ${err}` })

            res.status(200).send({ message: 'El usuario ha sido borrada' })
        })

    })
}

module.exports = {
    getAdmins,
    createAdminsCollection,
    createNewAdmin,
    editAdmin,
    deleteAdmin
}