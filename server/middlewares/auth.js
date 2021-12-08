const admin = require('../firebase');

exports.authCheck = (req, res, next) => {
    console.log(req.headers);
    // Executes if success
    next();
};