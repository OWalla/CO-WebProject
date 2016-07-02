var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment')
var Book = mongoose.model('Book')

router.post('/put', function(req, res) {
    var successMessage = "Comment saved successfully!";
    var title = req.body.title;
    var content = req.body.content;
    var user = req.body.user;
    var bookId = req.body.bookId;

    if (!title | !content | !bookId) {
        res.json("Some of the data is missing!");
    } else {
        var comment = new Comment({
            title: title,
            content: content,
            user: user,
            book: bookId
        });
        comment.save(function(err, commentInDb) {
            if (err) {
                console.log(err)
                res.json(err);
            } else {
                Book.findById(bookId, function(err, bookInDb) {
                    if (err) {
                        console.log(err);
                    } else {
                        bookInDb.comments.push(commentInDb);
                        bookInDb.save(function(err, result) {
                            if (err) {
                                console.log(err);
                                res.json(err);
                            } else {
                                res.json(successMessage)
                            }
                        });
                    }
                });
            }
        })
    }
});

module.exports = router;
