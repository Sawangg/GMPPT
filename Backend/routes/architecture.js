const { Router } = require("express");
const db = require("../databases.js");
const router = Router();
const { isAuthenticated, isProf } = require("../middleware.js");

router.post('/:idarchi/modeles/new', isAuthenticated, isProf, async (req, res) => {
    const { idarchi } = req.params;
    const { image1, image2 } = req.body;
    await db.promise().execute(`DELETE from modeles3D WHERE id_architecture=${idarchi}`);
    db.promise().execute(`INSERT INTO modeles3D VALUES('${image1}','${image2}',${idarchi})`)
        .then(() => {
            return res.sendStatus(200);
        }).catch(() => {
            return res.sendStatus(500);
        });
});

router.get('/:idarchi/modeles', isAuthenticated, isProf, async (req, res) => {
    const { idarchi } = req.params;
    db.promise().execute(`SELECT * FROM modeles3D WHERE id_architecture=${idarchi}`)
        .then(([rows]) => {
            if (!rows[0]) return res.sendStatus(404);
            return res.status(200).send(rows);
        }).catch(() => {
            return res.sendStatus(500);
        });
});

module.exports = router;