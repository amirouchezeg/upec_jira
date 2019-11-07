// Import sprint model
Comment = require('../models/commentsModel');
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
        utilisateur:Joi.string(),
        commentaire: Joi.string(),
        create_date: Joi.date(),
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
            comment.commentaire = req.body.commentaire;
            comment.create_date = req.body.create_date;   
            comment.utilisateur = req.body.utilisateur;
            comment.save(function (err) {
                res.json({
                  message: 'New  created!',
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