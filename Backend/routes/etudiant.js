const { Router } = require("express");
const db = require("../databases.js");
const router = Router();
const { isAuthenticated, isProf } = require("../middleware.js");
const ExcelJS = require('exceljs');
const { generatePwd } = require("../utils.js");

router.post('/new', isAuthenticated, isProf, async (req, res) => {
    const { idpromo } = req.body;
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
    const [{ AUTO_INCREMENT }] = (await db.promise().execute(`SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA ='GMP' AND TABLE_NAME = 'authentification';`))[0];
    let insertEtu = 'INSERT INTO etudiant(id_auth, nom, prenom, id_promo) VALUES';
    let insertAuth = 'INSERT INTO authentification(username, password, isProf) VALUES';
    console.log(AUTO_INCREMENT);
    let i = AUTO_INCREMENT;
    file.forEach(ligne => {
        insertAuth += ` ('${ligne[2]}', '${ligne[3]}', false),`;
        insertEtu += ` ('${i}', '${ligne[0]}', ${ligne[1]}, ${idpromo}),`;
        i++;
    });
    insertAuth = insertAuth.slice(0, -1);
    insertEtu = insertEtu.slice(0, -1);
    console.log(insertEtu);
    await db.promise().execute(insertAuth);
    await db.promise().execute(insertEtu);
    return res.sendStatus(200);
});

module.exports = router;
