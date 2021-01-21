const { Router } = require("express");
const db = require("../databases.js");
const router = Router();
const ExcelJS = require('exceljs');
const { isAuthenticated, isProf } = require("../middleware.js");

router.post('/:id_architecture/modeles/new', isAuthenticated, isProf, async (req, res) => {
    const { id_architecture } = req.params;
    const { image1, image2 } = req.files;
    await db.promise().execute(`DELETE from modeles3D WHERE id_architecture=${id_architecture}`).then(async () => {
        await db.promise().query(`INSERT INTO modeles3D SET ?;`, { id_architecture, image1: image1.data, image2: image2.data }).then(() => {
            return res.sendStatus(200);
        }).catch(() => {
            return res.sendStatus(500);
        });
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.get('/:id_architecture/modeles', isAuthenticated, (req, res) => {
    const { id_architecture } = req.params;
    db.promise().execute(`SELECT * FROM modeles3D WHERE id_architecture=${id_architecture}`).then(([rows]) => {
        if (!rows[0]) return res.sendStatus(404);
        return res.status(200).send(rows);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.post('/new', isAuthenticated, isProf, async (req, res) => {
    try {
        const workbook = new ExcelJS.Workbook();
        const feuille = (await workbook.xlsx.load(req.files.fileUploaded.data)).worksheets[0];
        await db.promise().execute(`DELETE FROM architecture`);
        let insertArchi = 'INSERT INTO architecture VALUES ';
        feuille.eachRow((row, number) => {
            insertArchi += ` ('${number}', ${row.getCell(1).value}, ${row.getCell(2).value}, ${row.getCell(3).value}, ${row.getCell(4).value}, ${row.getCell(5).value}, ${row.getCell(6).value}, ${row.getCell(7).value}, ${row.getCell(8).value}, ${row.getCell(9).value}),`;
        });
        await db.promise().execute(insertArchi);
        return res.sendStatus(200);
    } catch {
        return res.sendStatus(500);
    }
});

module.exports = router;