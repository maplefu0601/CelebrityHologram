'use strict';

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const bcrypt = require('bcryptjs');

const secret = process.env.SECRET_STR;

const lockout = require('../controllers/lockout');

const comparePassword = function(suppliedPassword, userPassword, callback) {
    bcrypt.compare(suppliedPassword, userPassword, function(err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

exports.comparePassword = comparePassword;

const db = require('../server').db;
let ObjectID = require('mongodb').ObjectID;

const localOptions = {
    usernameField: 'email', 
    passReqToCallback : true
};

const localLogin = new LocalStrategy(localOptions, function(req, email, password, done) {
    db.collection('users').findOne({ email: email }, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (!user) {
            return done(null, false);
        }
        if (user.lockOut && user.lockOut.lockedOut && lockout.checkLockOut(user.lockOut.time)) {
            return done(null, false);
        }
        comparePassword(password, user.password, function(err, isMatch) {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                const IP = req.headers["x-forwarded-for"];
                lockout.failedLogIn(IP, user, function(err, isLockedOut) {
                    if (err) {
                        return done(err);
                    }
                    return;
                });
                return done(null, false);
            }
            return done(null, user);
        });
    });
    
});

const cookieToken = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};

const jwtOptions = {
    jwtFromRequest: cookieToken,
    secretOrKey: secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    // check if the token has expired
    const NOW = new Date().getTime();
    if (payload.exp < NOW) {
        return done(null, false);
    }
    let obj_id = new ObjectID(payload.sub);
    db.collection('users').findOne({ "_id": obj_id }, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            if (user.lockOut && user.lockOut.lockedOut && lockout.checkLockOut(user.lockOut.time)) {
                done(null, false);
            } else if (user.permissions && payload.iat < user.permissions.updatedAt) {
                // if the users permissions have changed since the token was issued
                return done(null, false);
            } else {
                // the user is not locked out and the token is valid
                done(null, user);
            }
        } else {
            done(null, false);
        }
    });
});

passport.use(jwtLogin);
passport.use(localLogin);


