const { Router } = require("express");
const db = require("../databases.js");
const router = Router();
const { isAuthenticated, isProf } = require("../middleware.js");

router.post('/:idmodele/categories/new', isAuthenticated, isProf, async (req, res) => {
    const { idmodele } = req.params;
    try {
        await db.promise().execute(`DELETE FROM categories WHERE id_modele = ${idmodele}`);
        req.body.forEach(async categorie => {
            db.promise().execute(`INSERT INTO categories VALUES (NULL, '${categorie.nom}', ${categorie.margeErreur}, ${idmodele})`).then(([rows]) => {
                categorie.tabFormule.forEach(async formule => {
                    await db.promise().execute(`INSERT INTO formules VALUES (NULL, '${formule.nomFormule}', '${formule.formule}', ${rows.insertId})`);
                });
            });
        });
        return res.sendStatus(200);
    } catch (_err) {
        return res.sendStatus(500);
    }
});

router.get('/:idmodele/categories', isAuthenticated, isProf, (req, res) => {
    const { idmodele } = req.params;
    let arr = [];
    db.promise().execute(`SELECT * FROM categories C JOIN formules F ON C.id_catego = F.id_catego WHERE C.id_modele = ${idmodele} ORDER BY C.id_catego, F.id_formule`).then(async ([rows]) => {
        if (!rows[0]) return res.sendStatus(404);
        let prevCatego = -1;
        rows.forEach(r => {
            if (r.id_catego != prevCatego) {
                prevCatego = r.id_catego;
                arr.push({
                    "nom": r.nom_catego,
                    "margeErreur": r.marge_erreur,
                    "formules": [],
                });
            }
            arr[arr.length - 1].formules.push({
                "nom": r.nom_formule,
                "contenu": r.contenu,
            });
        });
        return res.send(arr).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.get('/:idmodele/:idcategorie/formules', isAuthenticated, isProf, (req, res) => {
    const { idmodele, idcategorie } = req.params;
    db.promise().execute(`SELECT nom_formule, contenu FROM formules F JOIN categorie C ON F.id_catego = ${idcategorie} WHERE C.id_modele = ${idmodele}`).then(async ([rows]) => {
        if (!rows[0]) return res.sendStatus(404);
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.get('/:idmodele', isAuthenticated, isProf, (req, res) => {
    const { idmodele } = req.params;
    db.promise().execute(`SELECT * FROM modeleSujet WHERE id_modele = ${idmodele}`).then(([rows]) => {
        if (!rows[0]) return res.sendStatus(404);
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.get('/', isAuthenticated, isProf, (_req, res) => {
    db.promise().execute(`SELECT * FROM modeleSujet`).then(([rows]) => {
        if (!rows[0]) return res.sendStatus(404);
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.post('/new', isAuthenticated, isProf, (req, res) => {
    const { nommodele } = req.body;
    db.promise().execute(`INSERT INTO modeleSujet(nom_modele) VALUES ('${nommodele}')`).then(([rows]) => {
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.get('/:idmodele/delete', isAuthenticated, isProf, async (req, res) => {
    const { idmodele } = req.params;
    db.promise().execute(`DELETE FROM modeleSujet WHERE id_modele = ${idmodele}`).then(()=>{
        return res.sendStatus(200);
    }).catch(()=> {
        return res.sendStatus(500);
    });
});

router.get('/:idmodele/variables', isAuthenticated, isProf, async (req, res) => {
    const { idmodele } = req.params;
    db.promise().execute(`SELECT * FROM variable_aleatoire WHERE id_modele = ${idmodele}`).then(([rows]) => {
        if (!rows[0]) return res.sendStatus(404);
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.post('/:idmodele/variables/new', isAuthenticated, isProf, (req, res) => {
    const { idmodele } = req.params;
    db.promise().execute(`DELETE FROM variable_aleatoire WHERE id_modele = ${idmodele}`).then(() => {
        let insert = 'INSERT INTO variable_aleatoire VALUES ';
        req.body.forEach(async variable => {
            insert += `(NULL, ${idmodele}, '${variable.nom}', ${variable.min}, ${variable.max}, ${variable.precision}),`;
        });
        insert = insert.slice(0, -1);
        db.promise().execute(insert).then(() => {
            return res.sendStatus(200);
        }).catch(() => {
            return res.sendStatus(500);
        });
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.get('/:idmodele/questions', isAuthenticated, isProf, (req, res) => {
    const { idmodele } = req.params;
    db.promise().execute(`SELECT unite, contenu, reponses FROM question WHERE id_modele = ${idmodele}`).then(([rows]) => {
        if (!rows[0]) return res.sendStatus(404);
        rows.reponses = JSON.parse(rows.reponses);
        rows.unite = JSON.parse(rows.unite);
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.post('/:idmodele/questions/new', isAuthenticated, isProf, async (req, res) => {
    const { idmodele } = req.params;
    try {
        await db.promise().execute(`UPDATE modele SET enonce = ${req.body.enonce} WHERE id_modele = ${idmodele}`);
        db.promise().execute(`DELETE FROM question WHERE id_modele = ${idmodele}`).then(() => {
            let insert = 'INSERT INTO question VALUES ';
            req.body.forEach(async question => {
                insert += `(NULL, ${question.id_question}, ${question.id_modele}, ${JSON.stringify(question.unite)}, ${question.contenu}, ${JSON.stringify(question.reponses)}),`;
            });
            insert = insert.slice(0, -1);
            db.promise().execute(insert).then(() => {
                return res.sendStatus(200);
            });
        });
    } catch(_err) {
        return res.sendStatus(500);
    }
});

module.exports = router;