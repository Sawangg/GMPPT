const { Router } = require("express");
const db = require("../databases.js");
const router = Router();
const { isAuthenticated, isProf } = require("../middleware.js");
const ExcelJS = require('exceljs');
const { generatePwd } = require("../utils.js");
const tempfile = require('tempfile');

router.post('/:idpromo/new', isAuthenticated, isProf, async (req, res) => {
    const { idpromo } = req.params;
    const workbook = new ExcelJS.Workbook();
    const feuille = (await workbook.xlsx.load(req.files.fileUploaded.data)).worksheets[0];
    const file = [];
    feuille.eachRow((rows) => {
        const ligne = [];
        rows.eachCell((cell) => {
            ligne.push(cell.value);
        });
        ligne.push(generatePwd());
        file.push(ligne);
    });
    let insertEtu = 'INSERT INTO etudiant VALUES ';
    let insertAuth = 'INSERT INTO authentification VALUES ';
    let [{ AUTO_INCREMENT }] = (await db.promise().execute(`SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA ='GMP' AND TABLE_NAME = 'authentification';`))[0];
    file.forEach(ligne => {
        insertAuth += ` ('${ligne[2]}', '${ligne[3]}', false, NULL, NULL),`;
        insertEtu += ` (${AUTO_INCREMENT}, '${ligne[0]}', '${ligne[1]}', ${idpromo}),`;
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

module.exports = router;