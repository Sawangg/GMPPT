const { Router } = require("express");
const db = require("../databases.js");
const router = Router();
const { isAuthenticated, isProf } = require("../middleware.js");

router.post('/:idarchi/modeles/new', isAuthenticated, isProf, async (req, res) => {
    const { idarchi } = req.params;
    const { image1, image2 } = req.body;
    await db.promise().query(`DELETE from modeles3D WHERE id_architecture=${idarchi}`);
    db.promise().query(`INSERT INTO modeles3D VALUES('${image1}','${image2}',${idarchi})`)
        .then((rows, err) => {
            if (err) {
                res.sendStatus(403);
            } else {
                res.sendStatus(200);
            }
        });
});

router.get('/:idarchi/modeles', isAuthenticated, isProf, async (req, res) => {
    const { idarchi } = req.params;
    db.promise().query(`SELECT * FROM modeles3D WHERE id_architecture=${idarchi}`)
    .then(([rows], err) => {
        if(!rows[0]) return res.sendStatus(404);
        if (err) {
            res.sendStatus(403);
        } else {
            res.status(200).send(rows);
        }
    });
});

module.exports = router;