var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = mongoose.model('Book')

router.get('/list/(:name)?/(:author)?/(:yearPublished)?', function(req, res) {

    var name = (req.params.name) || '';
    var author = (req.params.author) || '';
    var yearPublished = (req.params.yearPublished) || 0;

    Book.find({
            name: new RegExp(name, "i"),
            author: new RegExp(author, "i"),
            yearPublished: {
                $gte: yearPublished
            }
        })
        //.populate('comments')
        .exec(function(err, albums) {
            if (err)
                console.log(err);
            else
                res.json(albums);
        });
});

router.post('/put', function(req, res) {
    var successMessage = "Book saved successfully!";
    var id = req.body.id;
    var name = req.body.name;
    var author = req.body.author;
    var description = req.body.description;
    var yearPublished = req.body.yearPublished;

    if (!name | !author | !description | !yearPublished) {
        res.json("Some of the data is missing!");
    } else if (id) {
        Book.find({
            _id: id
        }, function(err, book) {
            if (err) {
                console.log(err);
                res.json(err);
            } else {
                book.name = name;
                book.author = author;
                book.description = description;
                book.yearPublished = yearPublished;
                book.save(function(err, result) {
                    if (err) {
                        console.log(err);
                        res.json(err);
                    } else {
                        res.json(successMessage)
                    }
                });
            }
        })
    } else {
        var book = new Book({
            name: name,
            author: author,
            description: description,
            yearPublished: yearPublished,
            comments: []
        });
        book.save(function(err, result) {
            if (err) {
                console.log(err)
                res.json(err);
            } else {
                res.json(successMessage)
            }
        })
    }
});

router.get('/popularity', function(req, res) {
    Book.find({})
        .populate('comments')
        .exec(function(err, books) {
            if (err) {
                console.log(err);
                res.json(err);
            } else {
                return res.json(books);
            }
        });
});

module.exports = router;
