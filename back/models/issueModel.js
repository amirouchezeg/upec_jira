const mongoose = require('mongoose');

const status = Object.freeze({
    Todo: 'toDo',
    InProgress: 'inProgress',
    Finished: 'finished',
    preview: 'preview',
  });
const issueSchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
        min: 2,
        max:255
    },
    description: {
        type: String,
    },
    start_date: {
        type: Date,
        default: null,
    },
    sprint_id: {
        type: String,
    },
    end_date: {
        type: Date,
        default: null,
    },
    status: {
        type: String,
        enum: Object.values(status),
        default: 'preview',
        required: true
      },
    comments: [{ 
            commentaire: String,
            user_id: String,
     },],
    create_date: {
        type: Date,
        default: Date.now
    },
    users: { 
        user_id: String,
        email: String,
      },
});
// Export sprint model
const Issue = module.exports = mongoose.model('issue', issueSchema);
module.exports.get = function (callback, limit) {
    Issue.find(callback).limit(limit);
}