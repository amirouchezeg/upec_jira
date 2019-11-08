// Import sprint model
Issue = require('../models/issueModel');
const Joi = require('joi'); 

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
        start_date: Joi.date(),
        description: Joi.string(),
        comments: Joi.array().items(Joi.object({
            commentaire: Joi.string(),
            })),
        users: Joi.array().items(Joi.object({
            user_id: Joi.string(),
            })),
        end_date: Joi.date().greater(Joi.ref('start_date'))
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
            issue.users = req.body.users;
            issue.comments = req.body.comments;
            issue.save(function (err) {
                res.json({
                  message: 'New issue created!',
                  data: issue
               });
           });

        }
    })
};
exports.view = function (req, res) {
    Issue.findById(req.params.issue_id, function (err, issue) {
        if (err)
            res.send(err);
        res.json({
            message: 'issue details loading..',
            data: issue
        });
    });
};


exports.update = function (req, res) {
    Issue.findByIdAndUpdate(req.params.issue_id,req.body, {
        new: true
    },
        function(err, issue) {
            if (!err) {
                res.status(201).json({
                    data: issue
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