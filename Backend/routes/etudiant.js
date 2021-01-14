const { Router } = require("express");
const db = require("../databases.js");
const router = Router();
const { isAuthenticated, isProf, isStudent } = require("../middleware.js");
const ExcelJS = require('exceljs');
const { generatePwd } = require("../utils.js");
const tempfile = require('tempfile');

router.post('/:idpromo/new', isAuthenticated, isProf, async (req, res) => {
    const { idpromo } = req.params;
    const workbook = new ExcelJS.Workbook();
    const feuille = (await workbook.xlsx.load(req.files.fileUploaded.data)).worksheets[0];
    let insertEtu = 'INSERT INTO etudiant VALUES ';
    let insertAuth = 'INSERT INTO authentification VALUES ';
    let [{ AUTO_INCREMENT }] = (await db.promise().execute(`SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA ='GMP' AND TABLE_NAME = 'authentification';`))[0];
    feuille.eachRow((row) => {
        row.getCell(4).value = generatePwd();
        // nom, prenom, username, password
        insertEtu += ` (${AUTO_INCREMENT}, '${row.getCell(1).value}', '${row.getCell(2).value}', ${idpromo}),`;
        insertAuth += ` ('${row.getCell(3).value}', '${row.getCell(4).value}', false, NULL, NULL),`;
        ++AUTO_INCREMENT;
    });
    insertAuth = insertAuth.slice(0, -1);
    insertEtu = insertEtu.slice(0, -1);
    try {
        await db.promise().execute(insertAuth);
        await db.promise().execute(insertEtu);
        let tempFilePath = tempfile('.xlsx');
        await workbook.xlsx.writeFile(tempFilePath).then(() => {
            res.sendFile(tempFilePath);
        });
        return res.status(200);
    } catch {
        return res.sendStatus(500);
    }
});

router.get('/:idauth/variables', isAuthenticated, (req, res) => {
    const { idauth } = req.params;
    db.promise().execute(`SELECT * FROM variables_etu WHERE id_auth = ${idauth}`).then(([rows]) => {
        if (!rows[0]) return res.sendStatus(404);
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.get('/reponses/newest',isAuthenticated, isStudent, (req, res) => {
    db.promise().execute(`SELECT * FROM reponse_etudiant WHERE id_auth = ${req.user.id_auth} AND date IN (SELECT MAX(date) FROM reponse_etudiant)`).then(([rows]) => {
        if (!rows[0]) return res.sendStatus(404);
        rows[0].reponses = (rows[0].reponses == undefined ? rows[0].reponses : JSON.parse(rows[0].reponses));
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.get('/:id_auth/reponses', isAuthenticated, (req, res) => {
    db.promise().execute(`SELECT * FROM reponse_etudiant WHERE id_auth = ${req.params.id_auth}`).then(([rows]) => {
        if (!rows[0]) return res.sendStatus(404);
        rows.map(r => {
            r.reponses = (r.reponses == undefined ? r.reponses : JSON.parse(r.reponses));
        });
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

module.exports = router;