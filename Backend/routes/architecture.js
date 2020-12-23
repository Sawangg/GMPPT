const { Router } = require("express");
const db = require("../databases.js");
const router = Router();
const { isAuthenticated, isProf } = require("../middleware.js");

router.post('/:idarchi/modeles/new', isAuthenticated, isProf, async (req, res) => {
    const { idarchi } = req.params;
    const { image1, image2 } = req.files;
    const insert = {
        id_architecture: idarchi,
        image1: image1.data,
        image2: image2.data
    };
    const del = await db.promise().execute(`DELETE from modeles3D WHERE id_architecture=${idarchi}`)
        .catch(() => {
            return null;
        });
    if (!del) return res.sendStatus(500);

    db.promise().query(`INSERT INTO modeles3D SET ?;`, insert)
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