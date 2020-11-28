const express = require("express");

const app = express();

app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.get('/eleve/:id', (req, res) => {
    const { name } = req.params;
    // requete à la bd du style SELECT * FROM ELEVE WHERE nom = 'name' par exemple
    // if (resultat) {
    //     res.sendStatus(200);
    // } else {
    //     res.sendStatus(404);
    // }
});

app.listen(3001, () => {
    console.log("Le serveur fonctionne sur le port 3001");
});