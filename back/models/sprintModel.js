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
 *            issues:
 *              - issue_id: 5db427a746817b081cec97d6
 *              - issue_id: 5db427a746817b081cec97d6
 *            start_date: 2019-03-01
 *            end_date: 2019-08-01
 *      PostSprint:
 *          type: object
 *          properties:
 *             message:
 *               type: string
 *             data:
 *               type: object
 *               properties: 
 *                 status:
 *                   type: string
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 create_date:
 *                   type: string
 *                 ordre:
 *                   type: string
 *                 project_id:
 *                   type: string
 *                 descirption: 
 *                   type: string
 *                 issues:
 *                   type: array
 *                   properties: 
 *                      issue_id:
 *                          type: string
 *          example:
 *                 message: New sprint created!
 *                 data:                             
 *                       status: toDo
 *                       ordre: 1
 *                       id: 5e108446809910109814990f
 *                       description: description du sprint
 *                       title: Sprint for project 
 *                       project_id: 5db43549e451212f0c50acf6
 *                       issues:
 *                          - issue_id: 5db43549e451212f0c50acf6
 *                       start_date: 2019-03-01
 *                       end_date: 2019-08-01
 *                       create_date: 2020-01-04T12:25:42.459Z
 *      getSprintById:
 *          type: object
 *          properties:
 *             message:
 *               type: string
 *             data:
 *               type: object
 *               properties: 
 *                 id:
 *                   type: string
 *                 status:
 *                   type: string
 *                 start_date: 
 *                   type: string
 *                 end_date:
 *                   type: string
 *                 title:
 *                   type: string
 *                 ordre:
 *                   type: Number
 *                 description:
 *                   type: boolean
 *                 create_date:
 *                   type: string
 *                 project_id:
 *                   type: string
 *                 issues:
 *                   type: array
 *                   properties: 
 *                      issue_id:
 *                          type: string
 *      
 *          example:
 *                    message: sprint details loading..
 *                    data:                             
 *                        id: 5e1075b64e1dac4a08464afd
 *                        status: toDo
 *                        start_date: YYYY-MM-DD
 *                        end_date: YYYY-MM-DD
 *                        create_date: YYYY-MM-DD
 *                        title: sprint title
 *                        ordre: 1 
 *                        description: description  
 *                        project_id: 5dea9e92156c6f23049bc789
 *                        issues:
 *                          - issue_id: 5dea9e92156c6f23049bc789
 * 
 *      getIssues:
 *          type: object
 *          properties:
 *             data:
 *               type: array
 *               properties: 
 *                 id:
 *                   type: string
 *                 status:
 *                   type: string
 *                 start_date: 
 *                   type: string
 *                 end_date:
 *                   type: string
 *                 title:
 *                   type: string
 *                 sprint_id:
 *                   type: string
 *                 description:
 *                   type: boolean
 *                 create_date:
 *                   type: string
 *                 users:
 *                   type: array
 *                   properties:
 *                      user_id: 
 *                          type: string
 *                      email: 
 *                          type: string
 *                 comments:
 *                   type: array
 *                   properties: 
 *                      commentaire:
 *                          type: string
 *                      user_id: 
 *                          type: string      
 *          example:
 *                    data:                             
 *                        id: 5e1075b64e1dac4a08464afd
 *                        status: preview
 *                        start_date: YYYY-MM-DD
 *                        end_date: YYYY-MM-DD
 *                        create_date: YYYY-MM-DD
 *                        title: title
 *                        ordre: 1 
 *                        description: description  
 *                        sprint_id: 5dea9e92156c6f23049bc789
 *                        comments:
 *                          - commentaire: commentaire
 *                            user_id: l'identifant de l'utilisateur
 *                        users: 
 *                          - user_id: 5df8b4bd13704029e46e5a4a
 *                            email: email@gmail.com
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