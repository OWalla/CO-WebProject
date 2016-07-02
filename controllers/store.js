var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Store = mongoose.model('Store');

router.get('/list', function(req, res) {

    var name = (req.params.name) || '';

    Store.find({})
        .exec(function(err, albums) {
            if (err)
                console.log(err);
            else
                res.json(albums);
        });
});

router.get('/list/(:bookName)', function(req, res) {

    var bookName = (req.params.bookName) || '';

    Store.find({
        books: new RegExp(bookName, "i")
    })
    .exec(function(err, albums) {
        if (err)
            console.log(err);
        else
            res.json(albums);
    });
});

module.exports = router;
