// Set up the app
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Other imports
var mongoose = require('mongoose');
var config = require('config');
var jsonfile = require('jsonfile');
var bodyParser = require("body-parser");

// Establish socket io connection
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('new comment', function(data){
        console.log("user " + data.user + " has posted")
        io.sockets.emit('add comment', {user: data.user});
    })
});

// models
var Comment = require('./models/comment');
var Book = require('./models/Book');
var Store = require('./models/Store');

// Post data support
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Use jade engine
app.set('view engine', 'jade');

// Routing
app.use('/', express.static('public'));
app.use('/app', express.static('app'));

// Book
var books = require('./controllers/book');
app.use('/book', books);

// Comment
var comments = require('./controllers/comment');
app.use('/comment', comments);

// Store
var stores = require('./controllers/store');
app.use('/store', stores);

//connect to our database
var dbConfig = config.get('RottenAvocados.dbConfig');
var connectionString = 'mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.dbName;
mongoose.connect(connectionString, function (err, db) {

    if (err != null) {
        throw "Error connecting to mongo database: " + JSON.stringify(err);
    }

    Comment.remove({}, function (err) {
    });
    Book.remove({}, function (err) {
    });
    Store.remove({}, function (err) {
    });

    // read data file
    var file = jsonfile.readFile("Data/books.json", function (err, data) {

        Book.insertMany(data.books, function (err, result) {
            if (err)
                console.log(err);
        })
    });

    // read data file
    var storesFile = jsonfile.readFile("Data/stores.json", function (err, data) {

        Store.insertMany(data.stores, function (err, result) {
            if (err)
                console.log(err);
        })
    });


    // Start the app
    http.listen(8080, function () {
        console.log('Rotten Avocados listening on port 8080!');
    });
});
