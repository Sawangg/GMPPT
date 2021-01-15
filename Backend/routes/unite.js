const { Router } = require("express");
const db = require("../databases.js");
const router = Router();
const { isAuthenticated, isProf } = require("../middleware.js");

router.post('/new', isAuthenticated, isProf, async (req, res) => {
    let insert = 'INSERT INTO unite VALUES';
    try {
        req.body.tabUnites.forEach(unite => {
            insert += ` ('${unite.nom}', '${unite.abrev}'),`;
        });
        insert = insert.slice(0, -1);
        await db.promise().execute(insert);
        return res.sendStatus(200);
    } catch {
        return res.sendStatus(500);
    }
});

router.get('/', isAuthenticated, async (_req, res) => {
    db.promise().execute(`SELECT * FROM unite`).then(([rows]) => {
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

module.exports = router;