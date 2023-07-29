const express = require('express');
const app = express();
const port = 8000; //by default port is 80
//use express router

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
//including the express layout 

app.use(express.static('./assets')); //including the assets folder where the files can be accessed
app.use('/', require('./routes'));
app.set('view engine', 'ejs');
app.set('views', './views');
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