const { Router } = require("express");
const db = require("../databases.js");
const router = Router();
const { isAuthenticated, isProf } = require("../middleware.js");
const { sh } = require("../utils.js");

router.get("/:idpromo/:idauth", isAuthenticated, isProf, async (req, res) => {
    try {
        const [variables_etu] = await db.promise().execute(`SELECT * FROM variable_etudiant VE JOIN variable_aleatoire VA ON VE.id_variable = VA.id_variable WHERE VE.id_auth=${req.params.idauth}`);
        const [formules] = await db.promise().execute(`SELECT * FROM formules F JOIN categories C ON C.id_catego=F.id_catego WHERE C.id_modele = ${variables_etu[0].id_modele}`);
        const [questions] = await db.promise().execute(`SELECT * FROM question WHERE id_modele = ${variables_etu[0].id_modele}`);
        if (!variables_etu[0] || !formules[0] || !formules[0]) return res.sendStatus(404);
        let giac = "giac '";
        variables_etu.forEach(variable => {
            giac += ` ${variable.nom}:=${variable.valeur};`;
        });
        formules.forEach(formule => {
            giac += ` ${formule.nom_formule}:=${formule.contenu};`;
        });
        let nbRep = 0;
        questions.forEach(question => {
            question.reponses = (question.reponses == undefined ? undefined : JSON.parse(question.reponses));
            if (question.reponses != undefined) {
                question.reponses.forEach(reponse => {
                    giac += `${reponse.selectForm};`;
                    ++nbRep;
                });
            }
        });
        giac += "'";
        const ret = (await sh(giac)).stdout.split('\n')[0].split(',');
        const reponses = ret.slice(ret.length - nbRep);
        let idRep = 0;
        questions.forEach(question => {
            if (question.reponses != undefined) {
                question.reponses.forEach(reponse => {
                    reponse.value = reponses[idRep];
                    ++idRep;
                });
            }
        });
        return res.status(200).send(questions);
    } catch {
        return res.sendStatus(500);
    }
});

module.exports = router;