const Post = require('../models/post');
module.exports.home = async function(req, res) {
    // console.log(req.cookies); //  set the cookie in the browser and it prints the pair in the console
    //we change the cookie in the response
    // res.cookie('user_id', 25);

    // console.log(req.cookies);

    // res.end('<h1> The controller is up and running for codeial </h1>');

    //populate the user for each post
    try {
        const posts = await Post.find({}).populate('user');
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        });
    } catch (err) {
        console.log('error in finding posts', err);
        return;
    }
}