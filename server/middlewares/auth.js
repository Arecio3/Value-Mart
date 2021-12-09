const admin = require('../firebase');

exports.authCheck = async (req, res, next) => {
    // console.log(req.headers);
    // Verify this is a firebase token
    try {
       const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken);
    //    console.log('FIREBASE USER IN AUTH CHECK', firebaseUser)
        req.user = firebaseUser;
        next();
    } catch (err) {
        res.status(401).json({
            err: "Invalid or expired token login again"
        })
    }
};