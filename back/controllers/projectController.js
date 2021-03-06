// Import sprint model
const Project = require('../models/projectModel');
const Joi = require('joi');
var Email = require("../models/email");
var nodemailer = require('nodemailer');

User = require('../models/userModel');


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

//get projects of a user
exports.getProjects = function (req, res) {
        Project.find({},function (err, projects) {
            var projectsMap =[];
            if (err)
                res.status(400).json({
                    status: "error",
                    message: err,
                });
            projects.forEach(function(project){
                project.users.forEach(dev =>{
                        if(dev.email == req.params.email)
                        // projectsMap[project._id] = project;              
                        projectsMap.push(project);              
                }) ;
            });
            res.status(200).json({
                status: "success",
                message: "All projects retrieved successfully",
                data: projectsMap
            });
      }); 
};

//get sprints of a user
exports.getSprints = function (req, res) {
    Project.findById(req.params.project_id, function (err, project) {
        if (err)
            res.send(err);
            else{
                sprints = project.sprints;
                var ids = [];
                sprints.forEach(element => {
                    ids.push(element._id);
                });

                Sprint.find({_id: {  $in: ids}} ,function(err, sprints) {
                    res.json({
                        data: sprints
                    });                 
                });
                }        
            });
};

// Handle create project actions
exports.new =  function (req, res) {
    const schema={
        title:Joi.string().min(2).required(),
        description:Joi.string().allow(''),
        owner:Joi.boolean().allow(''),
        start_date: Joi.date().allow(''),
        end_date: Joi.date().greater(Joi.ref('start_date')).allow(''),
        users: Joi.array().items(Joi.object({
            email: Joi.string().email().required(),
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
            var userNotExists = []; // the emails that don't exit in our db
            project.title = req.body.title;
            project.description = req.body.description;  
            project.start_date = req.body.start_date;
            project.end_date = req.body.end_date;
            project.users = req.body.users;
            project.sprints = req.body.sprints;
            if(req.body.users)
                project.users.forEach(utilisateur => {
                    var emailofUser = utilisateur.email;
                    User.findOne({email: emailofUser}, function (err, user) {
                        if 
                            (err) console.log('Error on the server.');
                        else {
                            if(user == null){
                                userNotExists.push(emailofUser);   
                            } 
                            else{
                                var userId = utilisateur._id;
                                utilisateur.user_id = userId;
                            } 
                        } 
                        // console.log('userNotExists', userNotExists);
                    }); 

                //sending emails
                console.log("sending emails...");
                var email = new Email(emailofUser);            
                email.transporter.sendMail(email.mailOptions, function(error, info){
                    if (error) {
                        console.log("error Send Email ",error);
                    } 
                }); 
            });
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
    if (req.body.users) {
        req.body.users.forEach(user=>{
            //sending emails
            var email = new Email(user.email);            
            email.transporter.sendMail(email.mailOptions, function(error, info){
                if (error)
                    console.log("error Send Email ",error);
                else
                    console.log('Email sent:...... ');
            }); 
        });
    }
    Project.findByIdAndUpdate(req.params.project_id,req.body, {
        new: true
    },function(err, project) {
            if (!err) {
                res.status(201).json({
                    data: project
                });
            } else {
                res.status(500).json({
                    message: "not found any relative data"
                })
            }
        }
    );
  
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