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

// This will remove the child comments of the book
Book.pre('remove', function(next) {
    this.model('Comment').remove({ book: this._id }, next);
});

module.exports = mongoose.model('Book', Book);
