const express = require('express');
const app = express();
const port = 8000; //by default port is 80
//use express router
app.use('/', require('./routes'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.listen(port, function(err) {
    if (err) {
        // console.log('Error listening to port')
        //inter-polation
        console.log(`Error listening to port: ${err}`);
    }
    console.log(`Server is running on port:${port}`);
});