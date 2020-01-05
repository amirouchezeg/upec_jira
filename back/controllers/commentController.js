// Import sprint model
Comment = require('../models/commentsModel');
Issue = require('../models/issueModel');
const Joi = require('joi'); 

// Handle index actions
exports.index = function (req, res) {
    Comment.get(function (err, comments) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "comments retrieved successfully",
            data: comments
        });
    });
};
// Handle create comment actions
exports.new = function (req, res) {
    const schema={
        email:Joi.string().required(),
        message: Joi.string(),
        create_date: Joi.date().allow(''),
        issue_id: Joi.string().required(),
    }
   
    Joi.validate(req.body,schema, (err, comment) =>{
        if(err){
            res.status(422).json({
                status: "error",
                message: "Invalid data",
                data: err.message
            });
        }
        else{
            comment = new Comment();
            comment.message = req.body.message;
            comment.create_date = req.body.create_date;   
            comment.email = req.body.e;
            comment.issue_id = req.body.issue_id;
            if(req.body.issue_id)
                Issue.findOne({_id: comment.issue_id}, function (err, issue) {
                    if (err) res.send('Error on the server.');
                    else {
                        if(issue == null){
                            res.send("issue doesn't exist...!")
                        } 
                        else{
                            comment.save(function (err) {
                                var myComment = {
                                    commentaire: req.body.message,
                                    email: req.body.email,
                                    issue_id: req.body.issue_id,
                                    _id:comment._id
                                }  
                                issue.comments.push(myComment);
                                m_issue={comments: issue.comments};
                                Issue.findByIdAndUpdate(comment.issue_id,m_issue, {
                                      new: true
                                },function(err, project) {}); 
                                

                                res.json({
                                  message: 'New comment created!',
                                  data: comment
                               });
                            });          
                          }  
                    } 
                
                }); 
        }
    })
};
exports.view = function (req, res) {
    Comment.findById(req.params.comment_id, function (err, comment) {
        if (err)
            res.send(err);
        res.json({
            message: 'comment details loading..',
            data: comment
        });
    });
};


exports.update = function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id,req.body, {
        new: true
    },
        function(err, comment) {
            if (!err) {
                res.status(201).json({
                    data: comment
                });
            } else {
                res.status(500).json({
                    message: "not found any relative data"
                })
            }
        }); 
};


Issue = require('../models/issueModel');

// Handle delete comment
exports.delete = function (req, res) {
    Issue.update(
        { _id: req.params.issue_id }, 
        { "$pull": 
            { "comments":{ "_id": req.params.comment_id } }
        }, 
        { safe: true, multi:true }, 
        function(err, obj) {
            if(err) console.log("delete commnet in issue ",err)
            if(obj) console.log("commnet deleted ",obj)

    });
    
    Comment.remove({
        _id: req.params.comment_id
    }, function (err, comment) {
        if (err)
            res.send(err);
        if(!comment){
            return res.status(404).json({
                message: 'issue not found'
            });
        }else{
            res.json({
                status: "success",
                message: 'comment deleted'
            });
        }
    });
};