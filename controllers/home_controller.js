module.exports.home = function(req, res) {
    // console.log(req.cookies); //  set the cookie in the browser and it prints the pair in the console
    //we change the cookie in the response
    // res.cookie('user_id', 25);

    // console.log(req.cookies);

    // res.end('<h1> The controller is up and running for codeial </h1>');
    return res.render('home', {
        title: "Home"
    });
}