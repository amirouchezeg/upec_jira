// Import sprint model
Sprint = require('../models/sprintModel');
const Joi = require('joi'); 

// Handle index actions
exports.index = function (req, res) {
    Sprint.get(function (err, sprints) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "sprints retrieved successfully",
            data: sprints
        });
    });
};
// Handle create sprint actions
exports.new = function (req, res) {
    const schema={
        title:Joi.string().min(2).required(),
        start_date: Joi.date(),
        end_date: Joi.date().iso().greater(Joi.ref("start_date")),
        ordre: Joi.number().required(),
    }
   
    Joi.validate(req.body,schema, (err, value) =>{
        if(err){
            res.status(422).json({
                status: "error",
                message: "Invalid data",
                data: err.message
            });
        }
        else{
            const sprint = new Sprint();
            sprint.title = req.body.title;
            sprint.ordre = req.body.ordre;
            sprint.description = req.body.description;
            sprint.start_date = req.body.start_date;
            sprint.end_date = req.body.end_date;
        
            sprint.save(function (err) {
                res.json({
                  message: 'New sprint created!',
                  data: sprint
               });
           });

        }
    })
    
};
exports.view = function (req, res) {
    Sprint.findById(req.params.sprint_id, function (err, sprint) {
        if (err)
            res.send(err);
        res.json({
            message: 'sprint details loading..',
            data: sprint
        });
    });
};
/*
exports.update = function (req, res) {
    Sprint.findById(req.params.sprint_id, function (err, user) {
        if (err)
            res.send(err);
        sprint.title = req.body.title;
        sprint.start_date = req.body.start_date;
        sprint.end_date = req.body.end_date;
        sprint.description = req.body.description;
        print.ordre = req.body.ordre;
        // save the sprint and check for errors
        sprint.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'sprint Info updated',
                data: sprint
            });
        });
    });
};*/
exports.update = function (req, res) {
    Project.findByIdAndUpdate(req.params.sprint_id,req.body, {
        new: true
    },
        function(err, sprint) {
            if (!err) {
                res.status(201).json({
                    data: sprint
                });
            } else {
                res.status(500).json({
                    message: "not found any relative data"
                })
            }
        });
  
};
// Handle delete sprint
exports.delete = function (req, res) {
    Sprint.remove({
        _id: req.params.sprint_id
    }, function (err, sprint) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'sprint deleted'
        });
    });
};