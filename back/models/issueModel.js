const mongoose = require('mongoose');
/**
 * @swagger
 *  components:
 *    schemas:
 *      Issue:
 *        type: object
 *        required:
 *          - title
 *        properties:
 *          title:
 *            type: string
 *          description:
 *            type: string
 *          start_date:
 *            type: string
 *          end_date:
 *            type: string
 *            description: La date de fin doit étre superieure à la date de début.
 *          create_date:
 *            type: string
 *            description: La date de la création du projet.
 *          status:
 *            type: object
 *            format: array
 *            description: Le statut de la tache est une enumération de toDo, inProgress, finished et preview.
 *          sprint_id:
 *            type: string
 *            description: l'identifiant du sprint auquel appartient la tache
 *          users:
 *            type: array
 *            description: les utilisateurs qui sont inscrits au projet.
 *            properties:
 *              user_id: string
 *              email: string
 *          comments: 
 *             type: array
 *             description: les commentaires de la tache
 *             properties:
 *               commentaire: string
 *               email: string                      
 *        example:
 *           description: description de la tache,
 *           start_date: 2019-12-01
 *           end_date: 2020-01-01
 *           create_date: 2019-10-26
 *           title: Gestion des projets
 *           users:
 *              user_id: 5da6067b12ed1b1b4c04178c
 *              email: ma.elazbaoui@gmail.com
 *           comments:
 *              commentaire: le commentaire sur la tache
 *              email: ma.elazbaoui@gmail.com
 *           sprint_id: 5db4295846817b081cec97d7
 * 
 * 
 * 
 *      postIssue:
 *        type: object
 *        properties:
 *          message:
 *              type: string
 *          data: 
 *              type: object
 *              properties:
 *                 title:
 *                    type: string
 *                 description:
 *                    type: string
 *                 start_date:
 *                    type: string
 *                 end_date:
 *                    type: string
 *                 create_date:
 *                    type: string
 *                 status:
 *                    type: string
 *                 sprint_id:
 *                    type: string
 *                 users:
 *                    type: array
 *                    properties:
 *                       user_id: string
 *                       email: string
 *                 comments: 
 *                    type: array
 *                    properties:
 *                       commentaire: string
 *                       email: string  
 *        example:
 *            message: New Issue created
 *            data:
 *              status: preview
 *              id: 5e108446809910109814990f
 *              description: description du sprint
 *              title: issue  
 *              users: []
 *              comments: []
 *              start_date: 2019-03-01
 *              end_date: 2019-08-01
 *              create_date: 2020-01-04T12:25:42.459Z     
 *              sprint_id: 2020-01-04T12:25:42.459Z
 *      getIssue:
 *        type: object
 *        required:
 *          - title
 *        properties:
 *          title:
 *            type: string
 *          description:
 *            type: string
 *          start_date:
 *            type: string
 *          end_date:
 *            type: string
 *            description: La date de fin doit étre superieure à la date de début.
 *          create_date:
 *            type: string
 *            description: La date de la création du projet.
 *          status:
 *            type: object
 *            format: array
 *            description: Le statut de la tache est une enumération de toDo, inProgress, finished et preview.
 *          sprint_id:
 *            type: string
 *            description: l'identifiant du sprint auquel appartient la tache
 *          users:
 *            type: array
 *            description: les utilisateurs qui sont inscrits au projet.
 *            properties:
 *              user_id: string
 *              email: string
 *          comments: 
 *             type: array
 *             description: les commentaires de la tache
 *             properties:
 *               commentaire: string
 *               email: string
 *        example:
 *            status: preview
 *            ordre: 1
 *            _id: 5e108446809910109814990f
 *            description: description du sprint
 *            title: issues  
 *            project_id: 5db43549e451212f0c50acf6
 *            users: []
 *            comments: []
 *            start_date: 2019-03-01
 *            end_date: 2019-08-01
 *            create_date: 2020-01-04T12:25:42.459Z     
 *            sprint_id: 2020-01-04T12:25:42.459Z
 *      Issues:
 *        type: object
 *        properties:
 *          status: 
 *            type: string
 *          message: 
 *            type: string
 *          data: 
 *            type: array
 *            properties: 
 *               title:
 *                  type: string
 *               description:
 *                  type: string
 *               start_date:
 *                  type: string
 *               end_date:
 *                  type: string
 *                  description: La date de fin doit étre superieure à la date de début.
 *               create_date:
 *                  type: string
 *               status:
 *                  type: string
 *               sprint_id:
 *                  type: string
 *                  description: l'identifiant du sprint auquel appartient la tache
 *               users:
 *                  type: array
 *                  properties:
 *                      user_id: string
 *                      email: string
 *               comments: 
 *                  type: array
 *                  properties:
 *                      commentaire: string
 *                      email: string
 *        example:
 *            status: success
 *            message: issues retreived successfuly
 *            data:
 *              - id: 5e108446809910109814990f
 *                description: description de la tache
 *                title: issues
 *                status: previw  
 *                users: []
 *                comments: []
 *                start_date: 2019-03-01
 *                end_date: 2019-08-01
 *                create_date: 2020-01-04T12:25:42.459Z     
 *                sprint_id: 2020-01-04T12:25:42.459Z

 *              - id: 5e108446809910109814990f
 *                description: description de la tache
 *                title: issues  
 *                status: preview
 *                users: []
 *                comments: []
 *                start_date: 2019-03-01
 *                end_date: 2019-08-01
 *                create_date: 2020-01-04T12:25:42.459Z     
 *                sprint_id: 2020-01-04T12:25:42.459Z
 * 
 *      getIssueById:
 *        type: object
 *        properties:
 *          message:
 *             type: string
 *          data: 
 *              type: object
 *              properties:     
 *                  title:
 *                      type: string
 *                  description:
 *                      type: string
 *                  start_date:
 *                      type: string
 *                  end_date:
 *                      type: string
 *                  create_date:
 *                      type: string
 *                  status:
 *                      type: string
 *                  sprint_id:
 *                      type: string
 *                  users:
 *                      type: array
 *                      properties:
 *                          user_id: string
 *                          email: string
 *                  comments: 
 *                      type: array
 *                      properties:
 *                          commentaire: string
 *                          email: string
 *        example:
 *            message: Chargement...
 *            data:
 *              status: preview
 *              id: 5e108446809910109814990f
 *              description: description du sprint
 *              title: issues  
 *              users: []
 *              comments: []
 *              start_date: 2019-03-01
 *              end_date: 2019-08-01
 *              create_date: 2020-01-04T12:25:42.459Z     
 *              sprint_id: 2020-01-04T12:25:42.459Z
*/
const status = Object.freeze({
    Todo: 'toDo',
    InProgress: 'inProgress',
    Finished: 'finished',
    preview: 'preview',
});

const Lables = Object.freeze({
    Bug: 'Bug',
    Prioritaire: 'Prioritaire',
    Bloquant: 'Bloquant',
    Amelioration: 'Amelioration',
    
});
const issueSchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
        min: 2,
        max:255
    },
    description: {
        type: String,
    },
    start_date: {
        type: Date,
        default: null,
    },
    sprint_id: {
        type: String,
    },
    end_date: {
        type: Date,
        default: null,
    },
    status: {
        type: String,
        enum: Object.values(status),
        default: 'preview',
        required: true
      },
    comments: [{ 
            commentaire: String,
            email: String,
     },],
    create_date: {
        type: Date,
        default: Date.now
    },
    users: { 
        user_id: String,
        email: String,
      },
    labels:[{
        type:String,
        enum: Object.values(Lables),
    }]
});
// Export sprint model
const Issue = module.exports = mongoose.model('issue', issueSchema);
module.exports.get = function (callback, limit) {
    Issue.find(callback).limit(limit);
}