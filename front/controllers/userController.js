// Import user model
User = require('../models/userModel');
//VALIDATION

const Joi = require('joi'); 
// const Joi = require('joi'); 
const schema={
    first_name:Joi.string().min(2).max(255).required(),
    last_name:Joi.string().min(2).max(255).required(),
    last_name:Joi.string().max(255).required().email(),    
    last_name:Joi.string().max(255).required(),    
}

// Handle index actions
exports.index = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    });
};
// Handle create contact actions
exports.new = function (req, res) {
    //validate the data before we a user
const schema = Joi.object().keys({ 
  name: Joi.string().alphanum().min(3).max(30).required(),
  birthyear: Joi.number().integer().min(1970).max(2013), 
}); 
const dataToValidate = { 
  name: "chris", 
  birthyear: 1971 
} 
const result = Joi.validate(dataToValidate, schema); 
res.send(result);
    // var user = new User();
    // user.email = req.body.email;
    // user.first_name = req.body.first_name;
    // user.last_name = req.body.last_name;
    // user.password = req.body.password;
    // // save the user and check for errors
    // user.save(function (err) {
    //     // if (err)
    //     //     res.json(err);
    //     res.json({
    //         message: 'New user created!',
    //         data: user
    //     });
    // });
};
// Handle view user info
exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'user details loading..',
            data: user
        });
    });
};
// Handle update user info
exports.update = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        user.first_name = req.body.first_name ;
        user.last_name = req.body.last_name ;
        // save the user and check for errors
        user.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'user Info updated',
                data: user
            });
        });
    });
};
// Handle delete user
exports.delete = function (req, res) {
    User.remove({
        _id: req.params.user_id
    }, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'user deleted'
        });
    });
};