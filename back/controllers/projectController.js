// Import sprint model
const Project = require('../models/projectModel');
const Joi = require('joi'); 

// Handle index actions
exports.index = function (req, res) {
    Project.get(function (err, projects) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "All projects retrieved successfully",
            data: projects
        });
    });
};
// Handle create project actions
exports.new = function (req, res) {
    const schema={
        title:Joi.string().min(2),
        description:Joi.string(),
        start_date: Joi.date(),
        end_date: Joi.date().greater(Joi.ref('start_date')),
        users: Joi.array().items(Joi.object({
        user_id: Joi.string(),
        role: Joi.string()
    })),
    sprints: Joi.array().items(Joi.object({
        sprint_id: Joi.string(),
    })),
    }
    Joi.validate(req.body,schema, (err, project) =>{
        if(err){
            res.status(422).json({
                status: "error",
                message: "Invalid data",
                data: err.message
            });
        }
        else{
            project = new Project();
            project.title = req.body.title;
            project.description = req.body.description;  
            project.start_date = req.body.start_date;
            project.end_date = req.body.end_date;
            project.users = req.body.users;
            project.sprints = req.body.sprints;
            project.save(function (err) {
               res.json({
                 message: 'New project created!',
                 data: project
              });
            });

        }
    })
    
};
exports.view = function (req, res) {
    Project.findById(req.params.project_id, function (err, project) {
        if (err)
            res.send(err);
        res.json({
            message: 'project detail by id..',
            data: project
        });
    });
};
exports.update = function (req, res) {
    Project.findById(req.params.project_id, function (err, project) {
        if (err)
            res.send(err);
            project.title = req.body.title;
            project.description = req.body.description;
            project.start_date = req.body.start_date;
            project.end_date = req.body.end_date;
            project.users = req.body.users;
            project.sprints = req.body.sprints;
        // save the sprint and check for errors
        issue.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'project Info updated',
                data: project
            });
        });
    });
};
// Handle delete issue
exports.delete = function (req, res) {
    Project.remove({
        _id: req.params.project_id
    }, function (err, project) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'project deleted'
        });
    });
};