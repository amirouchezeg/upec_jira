const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
        min: 2,
        max:255
    },
    description: {
        type: String,
        default: null
    },
    start_date: {
        type: Date,
        default: null,
    },
    end_date: {
        type: Date,
        default: null,
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    users: [ { 
        user_id: String, 
        role: String 
      },],
    sprints: [{  
        sprint_id: String,
      },]
});


// Export sprint model
const Project = module.exports = mongoose.model('projet', projectSchema);
module.exports.get = function (callback, limit) {
    Project.find(callback).limit(limit);
}