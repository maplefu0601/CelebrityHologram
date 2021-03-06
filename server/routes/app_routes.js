const express = require('express');
const router = express.Router();

// services
const passport = require('passport');
require('../services/passport.js');

const checkUserAuth = function(req, res) {
    passport.authenticate('jwt', { session: false }, function (err, user, info) {
        //console.log('authenticate:', err, user, info);
        if (err) { 
            req.logout();
            res.clearCookie('jwt', { httpOnly: true });
            return res.sendFile(process.cwd() + '/public/html/login.html');
        }
        if (user) {
            // they are auth'd and can access the app
            return res.sendFile(process.cwd() + '/public/html/app.html');
        } else {
            req.logout();
            res.clearCookie('jwt', { httpOnly: true });
            return res.sendFile(process.cwd() + '/public/html/login.html');
        }
    })(req, res);
};

router.get('/', function(req, res) {
    // check if the user has an active role
    checkUserAuth(req, res);
});

router.get('/*', function(req, res) {

    checkUserAuth(req, res);
});

module.exports = router;