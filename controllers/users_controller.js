const User = require('../models/user');

module.exports.profile = function(req, res) {
        // res.end('<h1> User Profile</h1>');
        return res.render('user_profile', {
            title: "Profile"
        });
    }
    //render the sign up page
module.exports.signup = function(req, res) {

        if (req.isAuthenticated()) {
            return res.redirect('/users/profile');
        }
        return res.render('user_sign_up', {
            title: "Codeial | Sign Up"
        })
    }
    //render the sign in page
module.exports.signin = function(req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

//get the sign up data
module.exports.create = async function(req, res) {
        if (req.body.password != req.body.confirm_password) {
            return res.redirect('back');
        }

        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                try {
                    const newUser = await User.create(req.body);
                    return res.redirect("/users/sign-in");
                } catch (err) {
                    console.log("error in creating user while signing up");
                    return res.redirect("back");
                }

            } else {
                return res.redirect('back');
            }
        } catch (error) {
            console.log("error in finding user in signing up");
            return;
        }


    }
    //Sign in and create session for the user
module.exports.createSession = function(req, res) {
    return res.redirect('/');
}

module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        if (err) {
            console.log('error in log out in destroy session ');
            return;
        }
        //res.redirect('/');
    }); //passport gives this function

    return res.redirect('/');
}