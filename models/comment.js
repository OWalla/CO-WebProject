var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment = new Schema({
    title: String,
    content: String,
    user: String,
    book: {
        type: Schema.ObjectId,
        ref: 'Book'
    }
});

module.exports = mongoose.model('Comment', Comment);
