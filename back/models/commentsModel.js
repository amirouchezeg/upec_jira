const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    create_date: {
        type: Date,
        default: Date.now
    },
    message:{
        type: String
    },
    user_id: { 
        type: String, 
    },
    issue_id: { 
        type: String, 
    }

});


// Export comment model
const Comment = module.exports = mongoose.model('comment', commentSchema);
module.exports.get = function (callback, limit) {
    Comment.find(callback).limit(limit);
}