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
        user_id:Joi.string().required(),
        message: Joi.string(),
        create_date: Joi.date(),
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
            comment.user_id = req.body.user_id;
            comment.issue_id = req.body.issue_id;
            if(req.body.issue_id)
                Issue.findOne({_id: comment.issue_id}, function (err, issue) {
                    if (err) console.log('Error on the server.');
                    else {
                        if(issue == null){
                            console.log("issue doesn't exist...!")
                        } 
                        else{
                            console.log('_____id du commentaire', comment._id)
                            issue.comments.push(comment._id);
                            m_issue={comments: issue.comments};
                            console.log('m_issue',m_issue);
                            Issue.findByIdAndUpdate(comment.issue_id,m_issue, {
                                  new: true
                              },function(err, project) {}
                              );           
                          }  
                    } 
                
                }); 

            comment.save(function (err) {
                res.json({
                  message: 'New comment created!',
                  data: comment
               });
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


// Handle delete comment
exports.delete = function (req, res) {
    Comment.remove({
        _id: req.params.comment_id
    }, function (err, comment) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'comment deleted'
        });
    });
};