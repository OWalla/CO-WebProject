var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment')

router.post('/put', function(req, res) {
    var successMessage = "Comment saved successfully!";
    var id = req.body.id;
    var title = req.body.title;
    var content = req.body.content;
    var userEmail = req.body.userEmail; // By user email
    var bookName = req.body.bookName;   // By book name

    if (!title | !content) {
        res.json("Some of the data is missing!");
    } else if (id) {
        Comment.find({
            _id: id
        }, function(err, comment) {
            if (err) {
                console.log(err);
                res.json(err);
            } else {
                comment.title= title;
                comment.content = content;
                comment.save(function(err, result) {
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
        var comment = new Comment({
            title: title,
            content: content,
            user: {}, // TODO: retrieve the user by it's email
            book: {} // TODO: retrieve the book by it's name
        });
        comment.save(function(err, result) {
            if (err) {
                console.log(err)
                res.json(err);
            } else {
                res.json(successMessage)
            }
        })
    }
});

module.exports = router;
