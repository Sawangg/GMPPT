const { Router } = require("express");
const db = require("../databases.js");
const router = Router();
const { isAuthenticated, isProf } = require("../middleware.js");
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

router.get('/:idpromo', isAuthenticated, isProf, async (req, res) => {
    const { idPromo } = req.params;
    db.promise().execute(`SELECT * FROM etudiant WHERE id_promo = ${idPromo}`).then(([rows]) => {
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.get('/:idpromo/delete', isAuthenticated, isProf, async (req, res) => {
    const { idPromo } = req.params;
    try {
        await db.promise().execute(`DELETE FROM promo WHERE id_promo = ${idPromo}`);
        await db.promise().execute(`DELETE FROM etudiant WHERE id_promo = ${idPromo}`);
        await db.promise().execute(`DELETE FROM authentification WHERE id_auth NOT IN (SELECT id_auth FROM etudiant) AND isProf = false`);
        return res.sendStatus(200);
    } catch {
        return res.sendStatus(500);
    }
});

router.post('/:idmodele/:idpromo/attribution', isAuthenticated, isProf, async (req, res) => {
    const { idmodele, idpromo } = req.params;
    try {
        await db.promise().execute(`INSERT INTO modele_promo VALUES (${idmodele},${idpromo})`);
        const [architectures] = await db.promise().execute('SELECT * FROM architecture');
        const [promo] = await db.promise().execute(`SELECT * FROM etudiant WHERE id_promo=${idpromo}`);
        const [variable_aleatoires] = await db.promise().execute(`SELECT * FROM variable_aleatoire WHERE id_modele=${idmodele}`);
        let insertVariables = 'INSERT INTO variable_etudiant ';
        let insertArchi = 'INSERT INTO archi_etudiant ';
        promo.forEach(etudiant => {
            const id_architecture = Math.floor(random(architectures.length - 1, 1, 0));
            insertArchi += `VALUES (${etudiant.id_auth}, ${id_architecture}),\n`;
            variable_aleatoires.forEach(variable_aleatoire => {
                const valeur = random(variable_aleatoire.max, variable_aleatoire.min, variable_aleatoire.precision);
                insertVariables += ` VALUES (${variable_aleatoire.id_variable},${etudiant.id_auth}, ${valeur}),\n`;
            });
        });
        insertVariables = insertVariables.slice(0, -1);
        insertArchi = insertArchi.slice(0, -1);
        await db.promise().execute(insertArchi);
        await db.promise().execute(insertVariables);
    } catch {
        return res.sendStatus(500);
    }
});

module.exports = router;