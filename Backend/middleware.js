function isAuthenticated(req, res, next) {
    return req.user ? next() : res.sendStatus(401);
}

function isProf(req, res, next) {
    return req.user.isProf === 1 ? next() : res.sendStatus(401);
}

function isStudent(req, res, next) {
    return req.user.isProf === 0 ? next() : res.sendStatus(401);
}

module.exports = { isAuthenticated, isProf, isStudent };