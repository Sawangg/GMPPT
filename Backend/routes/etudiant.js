const { Router } = require("express");
const db = require("../databases.js");
const router = Router();
const { isAuthenticated, isProf, isStudent } = require("../middleware.js");
const ExcelJS = require('exceljs');
const { generatePwd, dateFormat, encrypt } = require("../utils.js");
const tempfile = require('tempfile');

router.post('/reponses/new', isAuthenticated, isStudent, async (req, res) => {
    let insert = 'INSERT INTO reponse_etudiant VALUES';
    try {
        req.body.tabQuestions.forEach(question => {
            insert += ` (${req.user.id_auth}, ${question.indexQuestion}, '${JSON.stringify(question.tabReponses)}', '${dateFormat(new Date)}'),`;
        });
        insert = insert.slice(0, -1);
        await db.promise().execute(insert);
        return res.sendStatus(200);
    } catch {
        return res.sendStatus(500);
    }
});

router.post('/:idpromo/new', isAuthenticated, isProf, async (req, res) => {
    const { idpromo } = req.params;
    const workbook = new ExcelJS.Workbook();
    const feuille = (await workbook.xlsx.load(req.files.fileUploaded.data)).worksheets[0];
    let insertEtu = 'INSERT INTO etudiant VALUES ';
    let insertAuth = 'INSERT INTO authentification VALUES ';
    let [{ AUTO_INCREMENT }] = (await db.promise().execute(`SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA ='GMP' AND TABLE_NAME = 'authentification';`))[0];
    feuille.eachRow((row) => {
        row.getCell(4).value = encrypt(generatePwd(), row.getCell(3));
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
            return res.sendFile(tempFilePath).status(200);
        });
    } catch {
        return res.sendStatus(500);
    }
});

router.get('/:idauth/variables', isAuthenticated, (req, res) => {
    const { idauth } = req.params;
    db.promise().execute(`SELECT * FROM variable_etudiant VE JOIN variable_aleatoire VA ON VE.id_variable = VA.id_variable WHERE VE.id_auth = ${idauth}`).then(([rows]) => {
        if (!rows[0]) return res.sendStatus(404);
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

router.get('/:id_auth/architecture', isAuthenticated, (req, res) => {
    db.promise().execute(`SELECT * FROM archi_etudiant AE JOIN architecture A ON AE.id_architecture = A.id_architecture  WHERE id_auth = ${req.params.id_auth}`).then(([rows]) => {
        if (!rows[0]) return res.sendStatus(404);
        let obj = { id_architecture: rows[0].id_architecture, variables: [] };
        delete rows[0].id_auth;
        delete rows[0].id_architecture;
        for (const nom in rows[0]) {
            obj.variables.push({ nom, valeur: rows[0][nom] });
        }
        return res.send(obj).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.get('/:id_auth/architecture/excel', (req, res) => {
    db.promise().execute(`SELECT * FROM archi_etudiant AE JOIN architecture A ON AE.id_architecture = A.id_architecture  WHERE id_auth = ${req.params.id_auth}`).then(([rows]) => {
        if (!rows[0]) return res.sendStatus(404);
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("My Sheet");
        delete rows[0].id_auth;
        let index = 1;
        for (const nom in rows[0]) {
            worksheet.getRow(1).getCell(index).value = nom;
            worksheet.getRow(2).getCell(index).value = rows[0][nom];
            ++index;
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

router.get('/:id_auth/modeles', isAuthenticated, async (req, res) => {
    try {
        const [archi_etudiant] = await db.promise().execute(`SELECT * FROM archi_etudiant WHERE id_auth = ${req.params.id_auth}`);
        if (!archi_etudiant[0]) return res.sendStatus(404);
        db.promise().execute(`SELECT * FROM modeles3D WHERE id_architecture=${archi_etudiant[0].id_architecture}`).then(([rows]) => {
            if (!rows[0]) return res.sendStatus(404);
            return res.status(200).send(rows[0]);
        });
    } catch {
        return res.sendStatus(500);
    }
});

router.get('/:id_auth/essais', (req, res) => {
    db.promise().execute(`SELECT * FROM reponse_etudiant WHERE id_auth = ${req.params.id_auth} ORDER BY date DESC`).then(([rows]) => {
        if (!rows[0]) return res.sendStatus(404);
        let essais = [];
        let date = 0;
        let essai = {};
        rows.map(r => {
            if (r.date.toString() != date.toString()) {
                essai = { questions: [], date: r.date };
                essais.push(essai);
                date = r.date;
            }
            delete r.date;
            delete r.id_auth;
            r.reponses = (r.reponses == undefined ? r.reponses : JSON.parse(r.reponses));
            essai.questions.push(r);
        });
        return res.status(200).send(essais);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

module.exports = router;
