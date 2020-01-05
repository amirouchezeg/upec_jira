const mongoose = require('mongoose');
/**
 * @swagger
 *  components:
 *    schemas:
 *      Project:
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
 *          users:
 *            type: array
 *            properties:
 *              user_id: string
 *              role: string
 *              email: string              
 *            description: les utilisateurs qui sont inscrits au projet.
 *          sprints:
 *            type: array
 *            properties:
 *              sprint_id: string
 *            description: L'ensemble des sprints du projet.
 *        example:
 *           description: Projet qui permet de gerer les taches pour les projets entre les utilisateurs,
 *           start_date: 2019-12-01
 *           end_date: 2020-01-01
 *           create_date: 2019-10-26
 *           title: Gestion des projets
 *           users:
 *              user_id: 5da6067b12ed1b1b4c04178c
 *              role: developpeur
 *           sprints: 
 *              sprint_id: 5db4295846817b081cec97d7
 * 
 *      Projects:
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
 *               create_date:
 *                  type: string
 *               sprints:
 *                  type: array
 *                  properties:
 *                      sprint_id:
 *                          type:string
 *               users:
 *                  type: array
 *                  properties:
 *                      user_id: string
 *                      role: string
 *        example:
 *            status: success
 *            message: Projects retreived successfuly
 *            data:
 *              - id: 5e108446809910109814990f
 *                description: description de la tache
 *                title: title of the project
 *                users:
 *                  - user_id: 5da6067b12ed1b1b4c04178c
 *                    role: developpeur
 *                  - user_id: 5da6067b12ed1b1b4c04178c
 *                    role: administrateur
 *                sprints:
 *                  - sprint_id: 5da6067b12ed1b1b4c04178c
 *                  - sprint _id 5da6067b12ed1b1b4c04178c
 *                start_date: 2019-03-01
 *                end_date: 2019-08-01
 *                create_date: 2020-01-04T12:25:42.459Z 
 *              - id: 5e108446809910109814990f
 *                description: description de la tache
 *                title: title of the project
 *                users:
 *                  - user_id: 5da6067b12ed1b1b4c04178c
 *                    role: developpeur
 *                  - user_id: 5da6067b12ed1b1b4c04178c
 *                    role: administrateur
 *                sprints:
 *                  - sprint_id: 5da6067b12ed1b1b4c04178c
 *                  - sprint _id 5da6067b12ed1b1b4c04178c
 *                start_date: 2019-03-01
 *                end_date: 2019-08-01
 *                create_date: 2020-01-04T12:25:42.459Z 
 *      postProject:
 *        type: object
 *        properties:
 *          message: 
 *            type: string
 *          data: 
 *            type: array
 *            properties:
 *               id:
 *                  type: string 
 *               title:
 *                  type: string
 *               description:
 *                  type: string
 *               start_date:
 *                  type: string
 *               end_date:
 *                  type: string
 *               create_date:
 *                  type: string
 *               sprints:
 *                  type: array
 *                  properties:
 *                      sprint_id:
 *                          type:string
 *               users:
 *                  type: array
 *                  properties:
 *                      user_id: string
 *                      role: string
 *        example:
 *            message: New project created
 *            data:
 *              - id: 5e108446809910109814990f
 *                description: description de la tache
 *                title: title of the project
 *                users:
 *                  - user_id: 5da6067b12ed1b1b4c04178c
 *                    role: developpeur
 *                  - user_id: 5da6067b12ed1b1b4c04178c
 *                    role: administrateur
 *                sprints: []
 *                start_date: 2019-03-01
 *                end_date: 2019-08-01
 *                create_date: 2020-01-04T12:25:42.459Z 
 *      getProjectById:
 *        type: object
 *        properties:
 *          message: 
 *            type: string
 *          data: 
 *            type: object
 *            properties:
 *               id:
 *                  type: string 
 *               title:
 *                  type: string
 *               description:
 *                  type: string
 *               start_date:
 *                  type: string
 *               end_date:
 *                  type: string
 *               create_date:
 *                  type: string
 *               sprints:
 *                  type: array
 *                  properties:
 *                      sprint_id:
 *                          type:string
 *               users:
 *                  type: array
 *                  properties:
 *                      user_id: string
 *                      role: string
 *        example:
 *            message: Project Info
 *            data:
 *              - id: 5e108446809910109814990f
 *                description: description de la tache
 *                title: title of the project
 *                users:
 *                  - user_id: 5da6067b12ed1b1b4c04178c
 *                    role: developpeur
 *                  - user_id: 5da6067b12ed1b1b4c04178c
 *                    role: administrateur
 *                sprints:
 *                  - sprint_id: 5da6067b12ed1b1b4c04178c
 *                  - sprint_id: 5da6067b12ed1b1b4c04178c
 *                start_date: 2019-03-01
 *                end_date: 2019-08-01
 *                create_date: 2020-01-04T12:25:42.459Z 

 *           
 */

 const projectSchema = mongoose.Schema({

    title: {
        type: String,
        min: 2,
        max:255
    },
    description: {
        type: String,
        default: null
    },
    start_date: {
        type: Date,
        default: null,
    },
    end_date: {
        type: Date,
        default: null,
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    users: [ { 
        user_id: String,
        email: String, 
        //todo: status: enumof (waiting,accepted,refused), 
        role: String //admin or devlopper
      },],
    sprints: [{  
        sprint_id: String,
      },]
});


// Export project model
const Project = module.exports = mongoose.model('projet', projectSchema);
module.exports.get = function (callback, limit) {
    Project.find(callback).limit(limit);
}