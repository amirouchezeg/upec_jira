// Import sprint model
const Project = require('../models/projectModel');
const Joi = require('joi');
var Email = require("../models/email");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'GMAIL',
    auth: {
      user: 'inmyblog656@gmail.com',
      pass: 'InmYblOg12341!'
    }
});
  
var mailOptions = {
    from: 'notReplay@gmail.com',
    to: 'amirouchez656@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

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
exports.new =  function (req, res) {
    const schema={
        title:Joi.string().min(2).required(),
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
            
            //sending emails
            var email = new Email("amirouchez656@gmail.com");            
            email.transporter.sendMail(mailOptions, function(error, info){
                warrning="";
                if (error) {
                    console.log("error Send Email ",error);
                    warrning="error when sending email to "+ email.email;
                } 
                console.log('Email sent:...... ' + info.response);
                res.json({
                    message: 'New project created!',
                    warrning: warrning,
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
    Project.findByIdAndUpdate(req.params.project_id,req.body, {
        new: true
    },
        function(err, project) {
            if (!err) {
                res.status(201).json({
                    data: project
                });
            } else {
                res.status(500).json({
                    message: "not found any relative data"
                })
            }
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