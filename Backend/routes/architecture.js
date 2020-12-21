const { Router } = require("express");
const db = require("../databases.js");
const router = Router();
const { isAuthenticated, isProf } = require("../middleware.js");

router.post('/:idarchi/modeles/new', isAuthenticated, isProf, async (req, res) => {

});

router.get('/:idarchi/modeles', isAuthenticated, isProf, async (req, res) => {

});

module.exports = router;