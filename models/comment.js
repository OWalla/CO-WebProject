var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment = new Schema(
    {
        Title: String,
        Content: String,
        user: String,
        book: {
            type: Schema.ObjectId,
            ref: 'Book'
        }
    }
);

module.exports = mongoose.model('Comment', Comment);
