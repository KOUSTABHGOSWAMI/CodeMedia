const express = require('express');
const app = express();

//Reading and writing into cookies we require a parser called cookie parser
const cookieParser = require('cookie-parser');

const port = 8000; //by default port is 80
//use express router

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
//including the express layout 
const db = require('./config/mongoose');
// const sassMiddlewire = require('node-sass-middleware');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const { default: mongoose } = require('mongoose');

const MongoStore = require('connect-mongo'); //this accepts an argument called session as session data is getting stored

//const sassMiddlewire = require('node-')


// app.use(sassMiddlewire({
//     src: './assets/scss',
//     dest: './assets/css',
//     debug: true, // if we want to display message when it's unable to convert to css file
//     outputStyle: 'extended',
//     prefix: '/css' //where should my server look out for css file
// }));


//reading through post request we need
app.use(express.urlencoded());

app.use(cookieParser()); //used for handling and setting cookies

app.use(express.static('./assets')); //including the assets folder where the files can be accessed



//setting up views
app.set('view engine', 'ejs');
app.set('views', './views');

//making the layout extract the static files such as css and js files or images
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//mongo store is used to store the session cookie in the DB
app.use(session({
    name: 'codeial',
    //To do, change the secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
            mongoUrl: 'mongodb://127.0.0.1:27017/codeial_development',
            autoRemove: 'disabled'
        },

        function(err) {
            console.log(err, 'connect-mongodb setup ok');
        }

    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser); // checking if user is authenticated and setting the user information in the locals
app.use('/', require('./routes'));
app.listen(port, function(err) {
    if (err) {
        // console.log('Error listening to port')
        //inter-polation
        console.log(`Error listening to port: ${err}`);
    }
    console.log(`Server is running on port:${port}`);
});