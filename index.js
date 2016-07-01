var express = require('express');
var mongoose = require('mongoose');
var config = require('config');
var jsonfile = require('jsonfile');

// Set up the app
var app = express();

// Use jade engine
app.set('view engine', 'jade');

// Routing
app.use('/', express.static('public'));
app.use('/app', express.static('app'));

// Book
var books = require('./controllers/book');
app.use('/book', books);

var Comment = require('./models/comment');
var Book = require('./models/Book');

//connect to our database
var dbConfig = config.get('RottenAvocados.dbConfig');
var connectionString = 'mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.dbName;
mongoose.connect(connectionString, function(err, db) {

    if (err != null) {
        throw "Error connecting to mongo database: " + JSON.stringify(err);
    }

    Comment.remove({}, function(err) {});
    Book.remove({}, function(err) {});
    // Stores.remove({}, function(err) {});

    // read data file
    var file = jsonfile.readFile("Data/books.json", function(err, data) {

        Book.insertMany(data.books, function(err, result) {
            if (err)
                console.log(err);
        })
    });



    // Start the app
    app.listen(8080, function() {
        console.log('Rotten Avocados listening on port 8080!');
    });
});
