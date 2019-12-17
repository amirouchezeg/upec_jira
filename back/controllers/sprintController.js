// Import sprint model
Sprint = require('../models/sprintModel');
const Joi = require('joi'); 
Project = require('../models/projectModel');
Issue = require('../models/issueModel');

// Handle index actions
exports.index = function (req, res) {
    Sprint.get(function (err, sprints) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "sprints retrieved successfully",
            data: sprints
        });
    });
};
// Handle create sprint actions
exports.new = function (req, res) {
    const schema={
        title:Joi.string().min(2).required(),
        start_date: Joi.date(),
        description: Joi.string(),
        project_id: Joi.string().required(),
        end_date: Joi.date().greater(Joi.ref("start_date")),
        ordre: Joi.number().required(),
    }
    Joi.validate(req.body,schema, (err, value) =>{
        if(err){
            res.status(422).json({
                status: "error",
                message: "Invalid data",
                data: err.message
            });
        }
        else{
            const sprint = new Sprint();
            sprint.title = req.body.title;
            sprint.ordre = req.body.ordre;
            sprint.project_id = req.body.project_id;
            sprint.description = req.body.description;
            sprint.start_date = req.body.start_date;
            sprint.end_date = req.body.end_date;
            Project.findOne({_id: sprint.project_id}, function (err, project) {
                if (err) return res.status(401).send({ 
                    message: "Error on the server..."
                });
                else {
                    if(project == null){
                        return res.status(401).send({ 
                            message: "il n'y a aucun projet avec ces critères"
                        });
                    } 
                    else{
                      project.sprints.push(sprint._id);
                      m_sprints={sprints: project.sprints};
                      console.log(m_sprints);
                      Project.findByIdAndUpdate(sprint.project_id,m_sprints, {
                            new: true
                        },function(err, project) {}
                        );           
                    } 
                } 
            });      
           
            sprint.save(function (err) {
                res.json({
                  message: 'New sprint created!',
                  data: sprint
               });
           });

        }
    })
    
};
exports.view = function (req, res) {
    Sprint.findById(req.params.sprint_id, function (err, sprint) {
        if (err)
            res.send(err);
        res.json({
            message: 'sprint details loading..',
            data: sprint
        });
    });
};

exports.getIssues = function (req, res) {
    Sprint.findById(req.params.sprint_id, function (err, sprint) {
        if (err)
            res.send(err);
            else{
                issues = sprint.issues;
                var ids = [];
                issues.forEach(element => {
                    ids.push(element._id);
                });

                Issue.find({_id: {  $in: ids}} ,function(err, issues) {
                    res.json({
                        data: issues
                    });                 
                });
                }        
            });
};

exports.update = function (req, res) {
    if(req.body.status == 'inProgress'){
        Sprint.findById(req.params.sprint_id, function (err, sprint) {  
            Project.findById(sprint.project_id, function (err, project) {
                if (err)
                    res.send(err);
                    else{
                        sprints = project.sprints;
                        var ids = [];
                        sprints.forEach(element => {
                            ids.push(element._id);
                        });
                        var bool = false;
                        Sprint.find({_id: {  $in: ids}} ,function(err, sprints) {
                            sprints.forEach(s => {
                                if(s._id != req.params.sprint_id && s.status === 'inProgress'){
                                    bool = true;
                                    return;
                                }
                            });
                            console.log('bool', bool);
                            if(bool){
                                  res.status(500).json({
                                  message: "Ce projet contient déja un sprint en cours..."
                                 })
                            }else{
                                Sprint.findByIdAndUpdate(req.params.sprint_id,req.body, {new: true},function(err, sprint) {
                                    if (!err) {
                                        res.status(201).json({
                                        data: sprint
                                        });
                                    } else {
                                        res.status(500).json({
                                        message: "Aucun sprint trouvé avec ces critères"
                                        })
                                    }
                                });
                            }
                        });
                    }        
                });
            });  
    }else{
        Sprint.findByIdAndUpdate(req.params.sprint_id,req.body, {new: true},function(err, sprint) {
            if (!err) {
                res.status(201).json({
                data: sprint
                });
            } else {
                res.status(500).json({
                message: "Aucun sprint trouvé avec ces critères"
                })
            }
        });
    }
};
// Handle delete sprint
exports.delete = function (req, res) {
    Sprint.remove({
        _id: req.params.sprint_id
    }, function (err, sprint) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'sprint deleted'
        });
    });
};