var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var Book = new Schema(
    {
        name:  String,
        author: String,
        description: String,
        yearPublished: Number,
        comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
    }
);

module.exports = mongoose.model('Book', Book);