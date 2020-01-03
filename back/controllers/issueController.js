// Import sprint model
Issue = require('../models/issueModel');
const Joi = require('joi'); 
Sprint = require('../models/sprintModel');
User = require('../models/userModel');

// Handle index actions
exports.index = function (req, res) {
    Issue.get(function (err, issues) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "issues retrieved successfully",
            data: issues
        });
    });
};
// Handle create issue actions
exports.new = function (req, res) {
    const schema={
        title:Joi.string().min(2).required(),
        start_date: Joi.date().allow(''),
        comments: Joi.array().items(Joi.object({
            commentaire: Joi.string(),
            })),
        end_date: Joi.date().greater(Joi.ref('start_date')).allow(''),
        description : Joi.string().allow(''),
        userEmail: Joi.string().allow(''),
        sprint_id:Joi.string(),
        status: Joi.string().allow(''),
    }
     
    Joi.validate(req.body,schema, (err, issue) =>{
        if(err){
            res.status(422).json({
                status: "error",
                message: "Invalid data",
                data: err.message
            });
        }
        else{
            issue = new Issue();
            issue.title = req.body.title;
            issue.description = req.body.description;  
            issue.start_date = req.body.start_date;
            issue.end_date = req.body.end_date;   
            issue.comments = req.body.comments;
            issue.sprint_id= req.body.sprint_id;
            Sprint.findOne({_id: issue.sprint_id}, function (err, sprint) {
                if (err) res.send(err);
                else {
                    if(!sprint){
                       res.send('sprint doesnt exists');
                    } 
                    else{
                        sprint.issues.push(issue._id);
                        m_sprints={issues: sprint.issues};
                        Sprint.findByIdAndUpdate(issue.sprint_id,m_sprints, {new: true
                        },function(err, sprint) {}
                        );           
                    }
                } 
            });
            User.findOne({email: req.body.userEmail}, function (err, user) {
                if (err) res.send('Error on the server.');
                  else {
                    if(!user){
                        //res.send('cet utilisateur n\'existe pas ');
                        res.status(406).json({
                            message:  req.body.userEmail +": Cette personne ne s'est pas encore inscrite sur le site!",
                            error: "L'email n'exite pas"
                        });
                    } 
                    else{
                        var mUser = {
                            user_id:user._id,
                            email: req.body.userEmail
                        }  
                        issue.users = mUser;  
                        issue.save(function (err) {
                            res.json({
                                message: 'Une nouvelle tache a été créee',
                                data: issue
                            });
                        });   
                    } 
                
                } 
            });

        }
    })
};
exports.view = function (req, res) {
    Issue.findById(req.params.issue_id, function (err, issue) {
        if (err)
            res.send(err);
        res.json({
            message: 'Chargement..',
            data: issue
        });
    });
};


exports.update = function (req, res) {
    if (req.body.userEmail){
        User.findOne({email: req.body.userEmail}, function (err, user) {
            if (err){
                console.log('Error on the server.',err.message);
                res.status(400).json({
                    error: "Error on the server"
                });
            } 
            else {
                if(!user){
                    res.status(406).json({
                        message:  req.body.userEmail +": Cette personne ne s\'est pas encore inscrite sur le site!",
                        error: "L'email n'exite pas"
                    });
                } 
                else{
                    var mUser = {
                        user_id:user._id,
                        email: req.body.userEmail
                    }  
                    req.body.users=mUser;
                    //update the issue
                    Issue.findByIdAndUpdate(req.params.issue_id,req.body, {
                        new: true
                    },function(err, issue) {
                        if (!err) {
                            res.status(201).json({
                                message: "the issue is edited",
                                data: issue
                            });
                        } else {
                            res.status(500).json({
                                message: "not found any relative data"
                            })
                        }
                    });
                } 
            
            } 
        });    
    }else{
      //update the issue
      Issue.findByIdAndUpdate(req.params.issue_id,req.body, {
            new: true
        },function(err, issue) {
            if (!err) {
                res.status(201).json({
                    message: "the issue is edited",
                    data: issue
                });
            } else {
                res.status(500).json({
                    message: "not found any relative data"
                })
            }
        });  
    }
};


// Handle delete issue
exports.delete = function (req, res) {
    Issue.remove({
        _id: req.params.issue_id
    }, function (err, issue) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'issue deleted'
        });
    });
};

exports.addCommentToIssue = function (req, res) {
    if (req.body.issue_id) {
        Issue.findOne({_id: req.body.issue_id}, function (err, issue) {
            var myComment = {
                commentaire: req.body.commentaire,
                user_id: req.body.user_id
            }  
            req.body.comments=myComment;
            Issue.findByIdAndUpdate(req.params.issue_id,req.body, {
                new: true
            },function(err, issue) {
                if (!err) {
                    res.status(201).json({
                        message: "the issue is edited",
                        data: issue
                    });
                } else {
                    res.status(500).json({
                        message: "not found any relative data"
                    })
                }
            });

        });
    }
};