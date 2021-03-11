const { createPool } = require("mysql2/promise");

const db = require('./databases.js');

function isAuthenticated(req, res, next) {
    return req.user ? next() : res.sendStatus(401);
}

function isProf(req, res, next) {
    return req.user.isProf === 1 ? next() : res.sendStatus(401);
}

function isStudent(req, res, next) {
    return req.user.isProf === 0 ? next() : res.sendStatus(401);
}

function isAttribued(req, res, next) {
    db.promise().execute(`SELECT id_modele FROM  modele_promo WHERE id_modele = ${req.params.idmodele}`).then(([rows]) => {
        if (!rows[0]) return next();
        return res.sendStatus(405);
    }).catch(() => {
        return res.sendStatus(500);
    });
}

module.exports = { isAuthenticated, isProf, isStudent, isAttribued };