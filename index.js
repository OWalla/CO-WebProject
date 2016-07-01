var express = require('express');
var mongoose = require('mongoose');
var config = require('config');

// Set up the app
var app = express();

// Use jade engine
app.set('view engine', 'jade');

// Routing
app.use('/', express.static('public'));

// Book
var books = require('./controllers/book');
app.use('/book', books);

//connect to our database
var dbConfig = config.get('RottenAvocados.dbConfig');
var connectionString = 'mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.dbName;
mongoose.connect(connectionString, function (err) {
// Start the app
    app.listen(8080, function () {
        console.log('Rotten Avocados listening on port 8080!');
    });
});

