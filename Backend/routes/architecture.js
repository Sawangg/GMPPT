const { Router } = require("express");
const db = require("../databases.js");
const router = Router();
const ExcelJS = require('exceljs');
const tempfile = require('tempfile');
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
        const feuille = (await workbook.xlsx.load(req.files.excel.data)).worksheets[0];
        await db.promise().execute(`DELETE FROM architecture`);
        let insertArchi = 'INSERT INTO architecture VALUES ';
        feuille.eachRow((row, number) => {
            insertArchi += ` ('${number}', ${row.getCell(1).value}, ${row.getCell(2).value}, ${row.getCell(3).value}, ${row.getCell(4).value}, ${row.getCell(5).value}, ${row.getCell(6).value}, ${row.getCell(7).value}, ${row.getCell(8).value}, ${row.getCell(9).value}),`;
        });
        insertArchi = insertArchi.slice(0, -1);
        await db.promise().execute(insertArchi);
        return res.sendStatus(200);
    } catch {
        return res.sendStatus(500);
    }
});

router.get('/attribued_without_modeles/excel', (req, res) => {
    db.promise().execute('SELECT * FROM archi_etudiant AE JOIN architecture A ON AE.id_architecture = A.id_architecture JOIN modeles3D M ON  A.id_architecture = M.id_architecture WHERE image1 is NULL OR image2 is NULL GROUP BY A.id_architecture').then(([rows]) => {
        if (!rows[0]) return res.sendStatus(404);
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("My Sheet");
        for (let i = 0; i < rows.length; i++) {
            delete rows[i].id_auth;
            delete rows[i].image1;
            delete rows[i].image2;
            let index = 1;
            if (i == 0) {
                for (const nom in rows[i]) {
                    worksheet.getRow(1).getCell(index).value = nom;
                    ++index;
                }
                index = 1;
            }
            for (const nom in rows[i]) {
                worksheet.getRow(i + 2).getCell(index).value = rows[i][nom];
                ++index;
            }
        }
        let tempFilePath = tempfile('.xlsx');
        workbook.xlsx.writeFile(tempFilePath).then(() => {
            res.sendFile(tempFilePath);
            res.status(200);
        });
    }).catch(() => {
        return res.sendStatus(500);
    });
});

module.exports = router;