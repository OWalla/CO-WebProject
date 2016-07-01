/**
 * Created by Walla on 01/07/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment = new Schema(
    {
        Title: String,
        Content: String,
        user: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        book: {
            type: Schema.ObjectId,
            ref: 'Book'
        }
    }
);

module.exports = mongoose.model('Comment', Comment);
