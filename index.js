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

//reading through post request we need
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets')); //including the assets folder where the files can be accessed

app.use('/', require('./routes'));

//setting up views
app.set('view engine', 'ejs');
app.set('views', './views');

//making the layout extract the static files such as css and js files or images
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.listen(port, function(err) {
    if (err) {
        // console.log('Error listening to port')
        //inter-polation
        console.log(`Error listening to port: ${err}`);
    }
    console.log(`Server is running on port:${port}`);
});