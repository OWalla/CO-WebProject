var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Store = mongoose.model('Store');

router.get('/list/(:name)?/(:address)?/(:rank)?', function(req, res) {

    var name = (req.params.name) || '';
    var address = (req.params.address) || '';
    var rank = (req.params.rank) || 0;

    Store.find({
        name: new RegExp(name, "i"),
        address: new RegExp(address, "i"),
        rank: {
            $gte: rank
        }
    })
        .exec(function(err, info) {
            if (err)
                console.log(err);
            else {
                res.json(info);
            }
        });
});


router.get('/list/(:bookName)', function(req, res) {

    var bookName = (req.params.bookName) || '';

    Store.find({
        books: new RegExp(bookName, "i")
    })
    .exec(function(err, info) {
        if (err)
            console.log(err);
        else
            res.json(info);
    });
});

module.exports = router;
