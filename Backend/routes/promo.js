const { Router } = require("express");
const db = require("../databases.js");
const router = Router();
const { isAuthenticated, isProf, isStudent } = require("../middleware.js");
const { random } = require('../utils.js');

router.post('/new', isAuthenticated, isProf, async (req, res) => {
    const { nomPromo } = req.body;
    db.promise().execute(`INSERT INTO promo VALUES (NULL,'${nomPromo}')`).then(([rows]) => {
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.get('/', isAuthenticated, isProf, async (_req, res) => {
    db.promise().execute(`SELECT * FROM promo`).then(([rows]) => {
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.get('/modele', isAuthenticated, isStudent, (req, res) => {
    db.promise().execute(`SELECT MP.id_modele FROM modele_promo MP JOIN modele_sujet MS ON MS.id_modele = MP.id_modele WHERE id_promo = ${req.user.id_promo}`).then(([rows]) => {
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.get('/:idpromo', isAuthenticated, isProf, async (req, res) => {
    const { idpromo } = req.params;
    db.promise().execute(`SELECT * FROM etudiant WHERE id_promo = ${idpromo}`).then(([rows]) => {
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.get('/:idpromo/delete', isAuthenticated, isProf, async (req, res) => {
    const { idpromo } = req.params;
    try {
        await db.promise().execute(`DELETE FROM promo WHERE id_promo = ${idpromo}`);
        await db.promise().execute(`DELETE FROM etudiant WHERE id_promo = ${idpromo}`);
        await db.promise().execute(`DELETE FROM authentification WHERE id_auth NOT IN (SELECT id_auth FROM etudiant) AND isProf = false`);
        return res.sendStatus(200);
    } catch {
        return res.sendStatus(500);
    }
});

router.get('/:idpromo/:idmodele/attribution', isAuthenticated, isProf, async (req, res) => {
    const { idpromo, idmodele } = req.params;
    try {
        await db.promise().execute(`DELETE FROM modele_promo WHERE id_promo = ${idpromo}`);
        await db.promise().execute(`DELETE FROM archi_etudiant WHERE id_auth IN (SELECT id_auth FROM etudiant WHERE id_promo = ${idpromo})`);
        await db.promise().execute(`INSERT INTO modele_promo VALUES (${idmodele}, ${idpromo})`);
        const [architectures] = await db.promise().execute('SELECT * FROM architecture');
        const [promo] = await db.promise().execute(`SELECT * FROM etudiant WHERE id_promo = ${idpromo}`);
        const [variable_aleatoires] = await db.promise().execute(`SELECT * FROM variable_aleatoire WHERE id_modele = ${idmodele}`);
        let insertVariables = 'INSERT INTO variable_etudiant VALUES';
        let insertArchi = 'INSERT INTO archi_etudiant VALUES';
        promo.forEach(etudiant => {
            const id_architecture = Math.floor(random(architectures.length - 1, 1, 0));
            insertArchi += ` (${etudiant.id_auth}, ${id_architecture}),`;
            variable_aleatoires.forEach(variable_aleatoire => {
                variable_aleatoire.max = parseFloat(variable_aleatoire.max);
                variable_aleatoire.min = parseFloat(variable_aleatoire.min);
                const valeur = random(variable_aleatoire.max, variable_aleatoire.min, -variable_aleatoire.precision);
                insertVariables += ` (${variable_aleatoire.id_variable}, ${etudiant.id_auth}, '${valeur}'),`;
            });
        });
        insertVariables = insertVariables.slice(0, -1);
        insertArchi = insertArchi.slice(0, -1);
        await db.promise().execute(insertArchi);
        await db.promise().execute(insertVariables);
        return res.sendStatus(200);
    } catch(err) {
        console.log(err)
        return res.sendStatus(500);
    }
});

module.exports = router;