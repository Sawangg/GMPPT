function isAuthenticated(req, res, next) {
    return req.user ? next() : res.sendStatus(401);
}

module.exports = { isAuthenticated };