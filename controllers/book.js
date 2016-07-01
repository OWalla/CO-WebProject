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

module.exports = router;
