const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; // requiring library
const User = require('../models/user');


//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email' //we are setting email as username field as it is unique in the DB
}, async function(email, password, done) {
    try {
        const user = await User.findOne({ email: email });
        if (!user || user.password != password) { //we are checking the DB's password and given password

            console.log('Invalid Username and Password');
            return done(null, false); //we are making null inplace of error and we are returning false as a flag
        }

        return done(null, user);
    } catch (err) {
        console.log('Error in finding user----> passport');
        return done(err);
    }

}));



//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

//de-serializing the user from the key in the cookies
passport.deserializeUser(async function(id, done) {

    try {
        const user = await User.findById(id);
        return done(null, user);
    } catch (err) {
        console.log('Error in finding user----> passport in deserialization');
        return done(err);
    }

});


//check whether user is authenticated
passport.checkAuthentication = function(req, res, next) {
    //if the user is signed in, pass on the request to the next function(controller's action)
    if (req.isAuthenticated()) {
        return next();
    }
    //if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next) {
    if (req.isAuthenticated) {
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;