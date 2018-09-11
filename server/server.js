const express = require('express');
const app = express();
const morgan = require('morgan');
const mongo = require('mongodb').MongoClient;

require('dotenv').config({path: '../private/.env'});

app.use(express.static('public'));

// use morgan for logging errors
app.use(morgan('combined'));

// set the port
app.set('port', (process.env.PORT || 3000));

// DB setup
console.log(process.env.MONGO_URL);

mongo.connect(process.env.MONGO_URL, function (error, db) {
    if (error) {
    throw new Error('Database failed to connect!');
    } else {
    console.log('MongoDB successfully connected on port 27017.');
    }
    
    // export db connection so can be required in other files
    exports.db = db;
    
    // routes
    const routes = require('./routes/routes.js');
    routes(app);
    
    // start the server
    app.listen(app.get('port'), function() {
        console.log('server listening on port', app.get('port'));
    });

});
exports.app = app;