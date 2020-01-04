const mongoose = require('mongoose');
/**
 * @swagger
 *  components:
 *    schemas:
 *      Sprint:
 *        type: object
 *        required:
 *          - ordre
 *          - title
 *        properties:
 *          ordre:
 *            type: Number
 *          title:
 *            type: string
 *          description:
 *            type: string 
 *          status:
 *            type: object
 *            format: array
 *            description: Le statut du sprint est une enumération de toDo, inProgress et finished.
 *          start_date:
 *            type: string
 *          end_date:
 *            type: string
 *          create_date:
 *            type: string
 *            description: La date de la création du sprint.
 *          project_id:
 *            type: string
 *            description: L'identifiant du projet auquel appartient le sprint.
 *          issues:
 *            type: array
 *            properties:
 *              issue_id: string
 *            description: l'ensemble des taches qui appartiennent a ce sprint.
 *        example:
 *            ordre: 1
 *            description: description
 *            title: Sprint for project
 *            project_id: 5db43549e451212f0c50acf6
 *            issues[0]: 5db427a746817b081cec97d6
 *            start_date: 2019-03-01
 *            end_date: 2019-08-01
 *      postSprint:
 *        type: object
 *        required:
 *          - ordre
 *          - title
 *        properties:
 *          ordre:
 *            type: Number
 *          title:
 *            type: string
 *          description:
 *            type: string 
 *          status:
 *            type: object
 *            format: array
 *            description: Le statut du sprint est une enumération de toDo, inProgress et finished.
 *          start_date:
 *            type: string
 *          end_date:
 *            type: string
 *          create_date:
 *            type: string
 *            description: La date de la création du sprint.
 *          project_id:
 *            type: string
 *            description: L'identifiant du projet auquel appartient le sprint.
 *          issues:
 *            type: array
 *            properties:
 *              issue_id: string
 *            description: l'ensemble des taches qui appartiennent a ce sprint.
 *        example:
 *            status: toDo
 *            ordre: 1
 *            _id: 5e108446809910109814990f
 *            description: description du sprint
 *            title: Sprint for project 
 *            project_id: 5db43549e451212f0c50acf6
 *            issues: []
 *            start_date: 2019-03-01
 *            end_date: 2019-08-01
 *            create_date: 2020-01-04T12:25:42.459Z
 * */
const status = Object.freeze({
    Todo: 'toDo',
    InProgress: 'inProgress',
    Finished: 'finished',
  });
const sprintSchema = mongoose.Schema({

    ordre: {
        type: Number,
        required: true,
        max:255
    },
    title: {
        type: String,
        required: true,
        min: 2,
        max:255
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: Object.values(status),
        default: 'toDo',
        required: true
      },
    start_date: {
        type: Date,
        default: null,
    },    
    end_date: {
        type: Date,
        default: null
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    project_id: String, 
    issues: [ { 
        issue_id: String
      },],

});
// Export sprint model
const Sprint = module.exports = mongoose.model('sprint', sprintSchema);
module.exports.get = function (callback, limit) {
    Sprint.find(callback).limit(limit);
}