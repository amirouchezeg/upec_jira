// Import user model
User = require('../models/userModel');

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../config'); // get config file

//VALIDATION

const Joi = require('joi'); 

// Handle index actions
exports.index = function (req, res) {
    if (req.query.email) {
        User.find({ email: req.query.email }, function (err, users) {
            if (err) return res.status(500).send('Error on the server.');
            if (!users) return res.status(404).send('No user found.');

            users.forEach(function(user) {
                user.password=null;
            });
            res.json({
                status: "success",
                message: "Users results",
                data: users
            });
        });        
    }else
    if (req.query.first_name || req.query.last_name) {
        var params={  };
        if (!req.query.first_name) {
            params={ last_name: req.query.last_name };            
        }else if (!req.query.last_name) {
            params={ first_name: req.query.first_name };
        }else {
            params={ 
                first_name: req.query.first_name,
                last_name: req.query.last_name,
            };
        }
        User.find(params, function (err, users) {
            if (err) return res.status(500).send('Error on the server.');
            if (!users) return res.status(404).send('No user found.');

            users.forEach(function(user) {
                user.password=null;
            });
            res.json({
                status: "success",
                message: "Users results",
                data: users
            });
        });
    } else {

        User.get(function (err, users) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            users.forEach(function(user) {
                user.password=null;
            });
    
            res.json({
                status: "success",
                message: "Users retrieved successfully",
                data: users
            });
        });
    }
};

exports.login = function (req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) 
            return res.status(401).send({ 
                message: "L'email ou le mot de passe est incorrect"
            });
        // check if the password is valid
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) 
            return res.status(401).send({ 
                message: "L'email ou le mot de passe est incorrect"
            }
        );  
        // if user is found and password is valid
        // create a token
        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 *10 // expires in 24*10 hours
        });
    
        // return the information including token as JSON
        res.status(200).json({
            message: 'loged successfully',
            token: token,
            data: user
        });
    });
};

// Handle create contact actions
exports.new = function (req, res) {    
    const data = req.body;
    // validate the data 
    const schema = Joi.object().keys({
        email: Joi.string().email().required(), 
        first_name: Joi.string().alphanum().min(2).max(255).required(), 
        last_name: Joi.string().alphanum().min(2).max(255).required(), 
        password: Joi.string().min(6).required(), 
    });

    User.findOne({email: req.body.email}, function (err, user) {
        if (err)
            res.send(err);
        if(user){
            res.json({
                error: 'The email address is already taken!',
                message: 'The email address is already taken!',
            });
        }else{
            addUser(data, schema, res, req);
        }
    });

};


// Handle view user info
exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
        res.status(42).json({
                message:'user not found'
            });
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

function addUser(data, schema, res, req) {
    Joi.validate(data, schema, (err, value) => {
        if (err) {
            // send a 422 error response if validation fails
            res.status(404).json({
                status: 'error',
                message: 'Invalid request data',
                data: err.message
            });
        }
        else {
            // send a success response if validation passes
            var user = new User();
            user.email = req.body.email;
            user.first_name = req.body.first_name;
            user.last_name = req.body.last_name;
            user.password = bcrypt.hashSync(req.body.password, 8);
            // save the user and check for errors
            user.save(function (err) {
                if (err)
                    res.json(err);
                var token = jwt.sign({ id: user._id }, config.secret, {
                    expiresIn: 86400 * 10 // expires in 24 hours
                });
                res.json({
                    message: 'New user created!',
                    token: token,
                    data: user
                });
            });
        }
    });
}
