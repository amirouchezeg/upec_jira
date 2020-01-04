// api-routes.js
// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

// Import user controller
var userController = require('./controllers/userController');
// User routes

var VerifyToken = require('./controllers/VerifyToken');

router.route('/users/me').get( VerifyToken, function(req, res, next) {
    User.findById(req.userId, { password: 0 }, function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
      res.status(200).send(user);
    });  
});

router.route('/users')
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * path:
 *  /users/:
 *    get:
 *      summary: Le service qui permet de récupérer la liste des utilisateurs existants dans la base de données
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: un tableau d'utilisateur
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/getUser'
 */
.get(VerifyToken,userController.index)
 /** path:
 *  /users/:
 *    post:
 *      summary: Le service qui permet de créer un nouveau utilisateur
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: le schéma de l'utilisateur
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PostUser'
 */
.post(userController.new);
router.route('/users/login')
    /**
 * @swagger
  * path:
 *  /users/login:
 *    post:
 *      summary: Le service qui permet de s'entregistrer ou s'authentifier à l'application
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: le schéma de l'utilisateur
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/login'
 */
.post(userController.login);
router.route('/users/:_id/edit_password')
    /**
 * @swagger
 * path:
 *  /users/editPassword:
 *    post:
 *      summary: Le service qui permet à l'utilisateur de changer son mot de passe
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/editePassword'
 *      responses:
 *        "200":
 *          description: le mot de passe a été modifié avec succés 
 */
.post(userController.changePassword);
router.route('/users/:user_id')
    /**
 * @swagger
* path:
 *  /users/:user_id:
 *    get:
 *      summary: Le service qui permet de récupérer un utilisateur par son identifiant
 *      tags: [Users]
 *      parameters:
 *       - name: user_id
 *         description: l'identifiant de l'utilisateur à supprimer
 *         required: true
 *         type: string 
 *      responses:
 *        "200":
 *          description: les données de l'utilisateur ont été bien récupérées
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/getUser'
 */
    .get(VerifyToken,userController.view)
    .patch(VerifyToken,userController.update)
/**
 * @swagger
 * path:
 *  /users/:user_id:
 *    put:
 *      summary: Le service qui permet de modifier un utilisateur
 *      tags: [Users]
 *      parameters:
 *       - name: user_id
 *         description: l'identifiant de l'utilisateur à supprimer
 *         required: true
 *         type: string 
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: les données ont été modifié avec succés
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PostUser'
 */
    .put(VerifyToken,userController.update)
/**
 * @swagger
* path:
 *  /users/:user_id:
 *    delete:
 *      summary: Le service qui permet de supprimer un utilisateur avec son identifiant
 *      tags: [Users]
 *      parameters:
 *       - name: user_id
 *         description: l'identifiant de l'utilisateur à supprimer
 *         required: true
 *         type: string        
 *      responses:
 *        "200":
 *          description: L'utilisateur a été supprimé avec succés
 */
    .delete(VerifyToken,userController.delete);
router.route('/users/resend_email')
/**
 * @swagger
* path:
 *  /users/resend_email/:
 *    post:
 *      summary: Le service qui permet d'envoyer le message d'invitation au projet aux utilisateurs
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *            properties:
 *              email:
 *                type: string
 *            example:   
 *              email: ma.elazbaoui@gmail.com
 *      responses:
 *        "200":
 *          description: Le message a été envoyé avec succés
 */
.post(userController.sendemail);
router.route('/users/check_email/:token')
.get(userController.checkemail);
router.route('/users/send_email_check/:id')
.get(userController.send_email_check);

var sprintController = require('./controllers/sprintController');
// sprint routes
router.route('/sprints')
/**
 * @swagger
  * tags:
 *   name: Sprints
 *   description: Gestion des sprints
 */

/**
 * @swagger
 * path:
 *  /sprints/:
 *    get:
 *      summary: Le service qui permet de récupérer la liste des sprints existants dans la base de données
 *      tags: [Sprints]
 *      responses:
 *        "200":
 *          description: un tableau de sprint
 */
.get(sprintController.index)
/**
 * @swagger
  * path:
 *  /sprints/:
 *    post:
 *      summary: Le service qui permet de créer un nouveau sprint
 *      tags: [Sprints]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Sprint'
 *      responses:
 *        "200":
 *          description: le schéma du sprint
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/postSprint'
 *                
 */
.post(sprintController.new);
router.route('/sprints/:sprint_id')
/**
 * @swagger
 * path:
 *  /sprints/:sprint_id:
 *    get:
 *      summary: Le service qui permet de récupérer un utilisateur par son identifiant
 *      tags: [Sprints]
 *      parameters:
 *       - name: sprint_id
 *         description: l'identifiant du sprint à récupérer
 *         required: true
 *         type: string 
 *      responses:
 *        "200":
 *          description: les données du sprint ont été bien récupérées
*/
    .get(sprintController.view)
    .patch(sprintController.update)
    /**
 * @swagger
 * path:
 *  /sprints/:sprint_id:
 *    put:
 *      summary: Le service qui permet de modifier un sprint
 *      tags: [Sprints]
 *      parameters:
 *       - name: user_id
 *         description: l'identifiant du sprint à modifier
 *         required: true
 *         type: string 
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/sprint'
 *      responses:
 *        "200":
 *          description: les données ont été modifié avec succés
 */
    .put(sprintController.update)
    /**
 * @swagger
* path:
 *  /sprints/:sprint_id:
 *    delete:
 *      summary: Le service qui permet de supprimer un sprint avec son identifiant
 *      tags: [Sprints]
 *      parameters:
 *       - name: sprint_id
 *         description: l'identifiant du sprint à supprimer
 *         required: true
 *         type: string        
 *      responses:
 *        "200":
 *          description: Le sprint a été supprimé avec succés
 */
    .delete(sprintController.delete);


router.route('/sprints/:sprint_id/issues')
/**
 * @swagger
* path:
 *  /sprints/:sprint_id/issues:
 *    get:
 *      summary: Le service qui permet de récupérer la liste des taches d'un sprint
 *      tags: [Sprints]
  *      parameters:
 *       - name: sprint_id
 *         description: l'identifiant du sprint
 *         required: true
 *         type: string 
 *      responses:
 *        "200":
 *          description: un tableau de tache              
 */
    .get(sprintController.getIssues)

router.route('/users/:user_id/projects')
/**
 * @swagger
* path:
*  /users/:user_id/projects:
*    get:
*      summary: Le service qui permet de récupérer la liste des projets d'un utilisateur
*      tags: [Users]
 *      parameters:
 *       - name: user_id
 *         description: l'identifiant de l'utilisateur
 *         required: true
 *         type: string 
*      responses:
*        "200":
*          description: un tableau de projet              
*/
    .get(sprintController.getIssues)


// Import issue controller
var issueController = require('./controllers/issueController');
// issue routes
router.route('/issues')
/**
 * @swagger
  * tags:
 *   name: Issues
 *   description: Gestion des taches
 */

/**
 * @swagger
 * path:
 *  /issues/:
 *    get:
 *      summary: Le service qui permet de récupérer la liste des taches existants dans la base de données
 *      tags: [Issues]
 *      responses:
 *        "200":
 *          description: un tableau de taches
 */
.get(issueController.index)
/**
 * @swagger
 * path:
 *  /issues/:
 *    post:
 *      summary: Le service qui permet de créer une nouvelle tache
 *      tags: [Issues]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Issue'
 *      responses:
 *        "200":
 *          description: le schéma de la tache
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/postIssue'
 *                
 */
.post(issueController.new);
router.route('/issues/:issue_id')
/**
 * @swagger
* path:
 *  /issues/:issue_id:
 *    get:
 *      summary: Le service qui permet de récupérer une tache avec son identifant
 *      tags: [Issues]
 *      parameters:
 *       - name: issue_id
 *         description: l'identifiant de la tache
 *         required: true
 *         type: string 
 *      responses:
 *        "200":
 *          description: le schéma de la tache
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/postIssue'
 */
    .get(issueController.view)
    /**
 * @swagger
* path:
 *  /issues/:issue_id:
 *    put:
 *      summary: Le service qui permet de modifier une tache
 *      tags: [Issues]
 *      parameters:
 *       - name: issue_id
 *         description: l'identifiant de la tache à modifier
 *         required: true
 *         type: string 
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Issue'
 *      responses:
 *        "200":
 *          description: les données ont été modifié avec succés
 */
    .put(issueController.update)
  /**
 * @swagger
 * path:
 *  /sprints/:sprint_id:
 *    delete:
 *      summary: Le service qui permet de supprimer une tache avec son identifiant
 *      tags: [Issues]
 *      parameters:
 *       - name: issue_id
 *         description: l'identifiant de la tache à supprimer
 *         required: true
 *         type: string        
 *      responses:
 *        "200":
 *          description: La tache a été supprimé avec succés
 */
    .delete(issueController.delete);




// Import project controller
var projectController = require('./controllers/projectController');
router.route('/projects')
/**
 * @swagger
  * tags:
 *   name: Projects
 *   description: Gestion des projets
 */

/**
 * @swagger
 * path:
 *  /project/:
 *    get:
 *      summary: Le service qui permet de récupérer la liste des projets existants dans la base de données
 *      tags: [Projects]
 *      responses:
 *        "200":
 *          description: un tableau de projet
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/getProject'
 */
.get(projectController.index)
/**
 * @swagger
 * path:
 *  /project/:
 *    post:
 *      summary: Le service qui permet de créer un nouveau projet
 *      tags: [Projects]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Projet'
 *      responses:
 *        "200":
 *          description: le schéma de la tache
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/postProject'
 *                
 */
.post(projectController.new);
router.route('/projects/:project_id')
/**
 * @swagger
 * path:
 *  /project/:project_id:
 *    get:
 *      summary: Le service qui permet de récupérer un projet
 *      tags: [Projects]
 *      parameters:
 *       - name: project_id
 *         description: l'identifiant du projet à modifier
 *         required: true
 *         type: string 
 *      responses:
 *        "200":
 *          description: les données ont été récuprérées avec succés
 */
    .get(projectController.view)
    /**
 * @swagger
* path:
 *  /project/:project_id:
 *    put:
 *      summary: Le service qui permet de modifier un projet
 *      tags: [Projects]
 *      parameters:
 *       - name: project_id
 *         description: l'identifiant du projet à modifier
 *         required: true
 *         type: string 
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Project'
 *      responses:
 *        "200":
 *          description: les données ont été modifié avec succés
 */
    .put(projectController.update)
    /**
 * @swagger
* path:
 *  /projects/:project_id:
 *    delete:
 *      summary: Le service qui permet de supprimer un projet avec son identifiant
 *      tags: [Projects]
 *      parameters:
 *       - name: project_id
 *         description: l'identifiant du projet à supprimer
 *         required: true
 *         type: string        
 *      responses:
 *        "200":
 *          description: Le projet a été supprimé avec succés
 */
    .delete(projectController.delete); 
    

router.route('/projects/users/:email')
/**
 * @swagger
* path:
 *  /project/users/:email:
 *    get:
 *      summary: Le service qui permet de récupérer les emails des utilisateurs d'un projet
 *      tags: [Projects]
 *      responses:
 *        "200":
 *          description: les données ont été récuprérées avec succés
 */
    .get(projectController.getProjects);
router.route('/projects/:project_id/sprints')
/**
 * @swagger
* path:
 *  /project/:project_id/sprints:
 *    get:
 *      summary: Le service qui permet de récupérer les sprint d'un projet
 *      tags: [Projects]
 *      parameters:
 *       - name: project_id
 *         description: l'identifiant du projet à modifier
 *         required: true
 *         type: string 
 *      responses:
 *        "200":
 *          description: les données ont été récuprérées avec succés
 */
    .get(projectController.getSprints);


    

// Import comment controller
var commentController = require('./controllers/commentController');
// comments routes
router.route('/comments')
.get(commentController.index)
.post(commentController.new);
router.route('/comments/:comment_id')
    .get(commentController.view)
    .patch(commentController.update)
    .put(commentController.update)
    .delete(commentController.delete);  
// Export API routes
module.exports = router;