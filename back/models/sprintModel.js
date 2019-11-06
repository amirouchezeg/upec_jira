const mongoose = require('mongoose');

const status = Object.freeze({
    Todo: 'toDo',
    InProgress: 'inProgress',
    Finished: 'finished',
  });
const sprintSchema = mongoose.Schema({

    ordre: {
        type: Number,
        required: true,
        max:255
    },
    title: {
        type: String,
        required: true,
        min: 2,
        max:255
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(status),
        default: 'toDo',
        required: true
      },
    start_date: {
        type: Date,
        default: null,
    },    
    end_date: {
        type: Date,
        default: null
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    project_id: String, 

});
// Export sprint model
const Sprint = module.exports = mongoose.model('sprint', sprintSchema);
module.exports.get = function (callback, limit) {
    Sprint.find(callback).limit(limit);
}