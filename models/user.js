var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        comments : [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
    }
);

module.exports = mongoose.model('User', User);
