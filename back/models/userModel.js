// userModel.js
var mongoose = require('mongoose');
// Setup schema
var userSchema = mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        max:255
    },
    first_name: {
        type: String,
        required: true,
        max:255
    },
    last_name: {
        type: String,
        required: true,
        max:255
    },
    password: {
        type: String,
        required: true,
        min:6
    },
    path_avatar: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export User model
var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}