var express = require('express');
var router = express.Router();
var Book = require('../models/book');

router.get('/list/(:name?)*/(:author?)*/(:yearPublished?)*', function (req, res) {
    console.log(req.params.name);
    console.log(req.params.author);
    console.log(req.params.yearPublished);
    /*Book.find({name: req.params.name, author: req.params.author, yearPublished: {$gte: req.params.afterYear}})
    //.populate('comments')
        .exec(function (err, albums) {
            if (err)
                console.log(err);
            else
                res.json(albums);
        });*/

    res.json("fuck off");
});

module.exports = router;

MV(MVC)C
