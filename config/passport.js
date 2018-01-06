const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = mongoose.model('users');

module.exports = function (passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'pwd'
    }, (email, password, done) => {
        User.findOne({
            email: email
        }).then(user => {
            //console.log(password)
            if (!user) {
                return done(null, false, {
                    message: 'No user found'
                });
            }
            //check pw
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err
                if (isMatch)
                    return done(null, user)
                return done(null, false, {
                    message: 'Password wrong!'
                });
            })
        })
    }))

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}