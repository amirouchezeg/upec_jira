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
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                  message:
 *                    type: string
 *                  data:
 *                    type: array
 *                    properties: 
 *                      id:
 *                        type: string
 *                      last_name:
 *                        type: string
 *                      first_name: 
 *                        type: string
 *                      email:
 *                        type: string
 *                      create_date:
 *                        type: string
 *                example:
 *                    status: success
 *                    message: Users retrieved successfully
 *                    data:                             
 *                      - id: 5e1075b64e1dac4a08464afd
 *                        last_name: Elazbaoui
 *                        first_name: maryem
 *                        email: email@gmail.com
 *                        create_date: YYYY-MM-DD
 *                      - id: 1234567
 *                        last_name: zeggagh
 *                        first_name: amirouche
 *                        email: amirouche@gmail.com
 *                        create_date: YYYY-MM-DD                             
 *        "500":
 *          description:  erreur d'authentification
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  auth:
 *                    type: string
 *                  message:
 *                    type: string
 *                example:
 *                    auth: false
 *                    message: Failed to authenticate token.
 */
.get(VerifyToken,userController.index)
 /** 
 * @swagger
  * path:
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
 *        "409":
 *          description:  erreur lorque l'email est deja enregistré
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 *                  message:
 *                    type: string
 *                example:
 *                    eror: false
 *                    message: Cette adresse e-mail est déjà prise!.
  *        "404":
 *          description:  erreur lorsqu'un champ obligatoire n'est pas renseigné
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                  message:
 *                    type: string
 *                  data: 
 *                    type: string
 *                example:
 *                    status: error
 *                    message: Invalid request data.
 *                    data: child \"email\" fails because [\"email\" is required]
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
 *              type: object
 *              properties:
 *                 email:
 *                  type: string
 *                 password:
 *                  type: string
 *              example:
 *                  email: elazbaoui@gmail.com
 *                  password: XXXXXX
 *      responses:
 *        "200":
 *          description: Authentification réussie
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/login'
 *        "401":
 *          description: Authentification non autorisée
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *              properties:
 *                message:
 *                  type: string
 *              example:
 *                  message: L'email ou le mot de passe est incorrect
 */
.post(userController.login);
router.route('/users/:user_id/edit_password')
    /**
 * @swagger
 * path:
 *  /users/:user_id/edit_password:
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
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example:
 *                    message: Votre mot de passe a été modifié avec succés.
 *        "404":
 *          description: Erreur si l'utilisateur n'est pas enregistré
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example:
 *                    message: L'utilisateur n'est pas trouvé..
 *        "401":
 *          description: Erreur lorsque les champs sont incorrects
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example:
 *                    message: Le mot de passe de confirmation n'est pas identique..
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
 *         description: l'identifiant de l'utilisateur à récupérer
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
 *         description: l'identifiant de l'utilisateur à modifier
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
 *                $ref: '#/components/schemas/PutUser'
 *        "500":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example:
 *                    message: not found any relative data..
 * 
 * */
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
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status: 
 *                    type: string
 *                  message:
 *                    type: string
 *                example:
 *                    status: success
 *                    message: l'utilisateur a été supprimé avec succés..
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
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example:
 *                    message: le message a été envoyé avec succès..
 *        "406":
 *          description: une erreur est survenue lors de l'envoi du mail
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                  data:
 *                    type: object
 *                    properties:
 *                      code:
 *                       type: string
 *                      command:
 *                       type: string
 *                example:
 *                    message: l'email est incorrect...
 *                    data: 
 *                      code: EENVELOPE
 *                      command: API
 */
.post(userController.sendemail);
router.route('/users/check_email/:token')
/**
 * @swagger
* path:
 *  /users/check_email/:token:
 *    get:
 *      summary: Le service qui permet de verifier l'email de l'utilisateur
 *      tags: [Users]
 *      parameters:
 *       - name: token
 *         description: le token de l'utilisateur 
 *         required: true
 *         type: string 
 *      responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example:
 *                    message: Merci! Votre email est vérifié
 *        "409":
 *          description: une erreur est survenue lors de la verifcation de l'email
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example:
 *                    message: Il n y a pas d'email avec ce token.
 *        "500":
 *          description: une erreur technique est survenue
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example:
 *                    message: Error on the server.
 */
.get(userController.checkemail);
router.route('/users/send_email_check/:id')
/**
 * @swagger
* path:
 *  /users/send_email_check/:id:
 *    get:
 *      summary: Le service qui permet de verifier l'email
 *      tags: [Users]
 *      parameters:
 *       - name: user_id
 *         description: l'identifiant de l'utilisateur auquel on verifie l'email
 *         required: true
 *         type: string  
 *      responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                  user: 
 *                    type: object
 *                    properties:
 *                      id:
 *                       type: string
 *                      last_name:
 *                       type: string
 *                      first_name: 
 *                       type: string
 *                      email:
 *                       type: string
 *                      create_date:
 *                       type: string
 *                      password:
 *                       type: string
 *                      email_confirme:
 *                       type: boolean
 *                      email_token:
 *                       type: boolean
 *                example:
 *                    message: Merci! Votre email est vérifié
 *                    user: 
 *                        id: 5e1075b64e1dac4a08464afd
 *                        last_name: Elazbaoui
 *                        first_name: maryem
 *                        email: email@gmail.com
 *                        create_date: YYYY-MM-DD
 *                        password: 2a$08$VSwpcEoB0XszTwJ
 *                        email_confirme: true
 *                        email_token: true
 *        "409":
 *          description: une erreur est survenue lors de la verifcation de l'email
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example:
 *                    message: L'utilisateur n'est pas trouvé.
 *        "500":
 *          description: une erreur technique est survenue
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example:
 *                    message: Error on the server.
 */
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
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                  message: 
 *                    type: string
 *                  data: 
 *                    type: array
 *                    properties:
 *                      status:
 *                       type: string
 *                      start_date:
 *                       type: string
 *                      end_date: 
 *                       type: string
 *                      id:
 *                       type: string
 *                      title:
 *                       type: string
 *                      ordre:
 *                       type: Number
 *                      description:
 *                       type: boolean
 *                      issues:
 *                       type: array
 *                       properties:
 *                          id:
 *                           type: string
 *                example:
 *                    status: success
 *                    message: sprints retrieved successfully
 *                    data:                             
 *                      - status: toDo
 *                        start_date: YYYY-MM-dd
 *                        end_date: YYYY-MM-dd
 *                        id: 5da8915e0cc4c80f68cb8332
 *                        title: title of the sprint
 *                        ordre: 1
 *                        description: amirouche
 *                        issues: 
 *                           - issue_id: 5da8915e0cc4c80f68cb8332
 *                           - issue_id: 5da8915e0cc4c80f68cb8332  
  *                      - status: toDo
 *                        start_date: YYYY-MM-dd
 *                        end_date: YYYY-MM-dd
 *                        id: 5da8915e0cc4c80f68cb8332
 *                        title: title of the sprint
 *                        ordre: 1
 *                        description: descirption of the sprint
 *                        issues: 
 *                           - issue_id: 5da8915e0cc4c80f68cb8332
 *                           - issue_id: 5da8915e0cc4c80f68cb8332  
 *        "500":
 *          description: une erreur technique est survenue
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example:
 *                    message: Error on the server.
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
 *                 $ref: '#/components/schemas/PostSprint'
 *        "422":
 *          description: les données entrées sont incorrectes
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                  message:
 *                    type: string
 *                  data: 
 *                    type: string
 *                example:
 *                    status: error
 *                    message: invalid data 
 *                    data: child \"ordre\" fails because [\"ordre\" must be a number]
 *        "401":
 *          description: Erreur lorque le projet n'existe pas 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example:
 *                    message: il n'y a aucun projet avec ces critères
 */
.post(sprintController.new);
router.route('/sprints/:sprint_id')
/**
 * @swagger
 * path:
 *  /sprints/:sprint_id:
 *    get:
 *      summary: Le service qui permet de récupérer un sprint par son identifiant
 *      tags: [Sprints]
 *      parameters:
 *       - name: sprint_id
 *         description: l'identifiant du sprint à récupérer
 *         required: true
 *         type: string 
 *      responses:
 *        "200":
 *          description: les données du sprint ont été bien récupérées
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/getSprintById'
 *        "500":
 *          description: une erreur technique est survenue
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example:
 *                    message: Error on the server.
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
 *       - name: sprint_id
 *         description: l'identifiant du sprint à modifier
 *         required: true
 *         type: string 
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Sprint'
 *      responses:
 *        "200":
 *          description: les données ont été modifié avec succés
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/getSprintById' 
 *        "500":
 *          description: Dans un projet, un seul sprint est en cours.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example:
 *                    message: Ce projet contient déja un sprint en cours...
 *        "404":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example:
 *                    message: Aucun sprint trouvé avec ces critères

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
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example:
 *                    message: le sprint a été supprimé avec succés
 *        "500":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example:
 *                    message: Une erreur est survenue..
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
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/getIssues'  
 *        "500":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example:
 *                    message: Une erreur est survenue..           
 */
    .get(sprintController.getIssues)

router.route('/users/:user_id/projects')
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
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Issues' 
 *        "500":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                  message:
 *                    type: string
 *                example:
 *                    status: error
 *                    message: Une erreur est survenue.. 
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
 *        "422":
 *          description: les données entrées sont incorrectes
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                  message:
 *                    type: string
 *                  data: 
 *                    type: string
 *                example:
 *                    status: error
 *                    message: invalid data 
 *                    data: child \"title\" fails because [\"title\" is required]
 *        "406":
 *          description: quand l'utilisateur ne s'est pas inscrit sur le site
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                  error: 
 *                    type: string
 *                example:
 *                    message: email + Cette personne ne s'est pas encore inscrite sur le site! 
 *                    data: L'email n'exite pas           
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
 *                 $ref: '#/components/schemas/getIssueById'
 *        "500":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                  message:
 *                    type: string
 *                example:
 *                    status: error
 *                    message: Une erreur est survenue.. 
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
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/getIssueById'
 *        "500":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                  message:
 *                    type: string
 *                example:
 *                    status: error
 *                    message: not found any relative data
 */
    .put(issueController.update)
  /**
 * @swagger
 * path:
 *  /issues/:issue_id:
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
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example:
 *                    message: la tache a été supprimée avec succés
 *        "500":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example:
 *                    message: Une erreur est survenue..
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
 *                $ref: '#/components/schemas/Projects'
 *        "500":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example:
 *                    message: Une erreur est survenue..
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
 *              $ref: '#/components/schemas/Project'
 *      responses:
 *        "200":
 *          description: le schéma de la tache
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/postProject'
 *        "422":
 *          description: les données entrées sont incorrectes
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                  message:
 *                    type: string
 *                  data: 
 *                    type: string
 *                example:
 *                    status: error
 *                    message: invalid data 
 *                    data: child \"title\" fails because [\"title\" is required]
 *                
 */
.post(projectController.new);
router.route('/projects/:project_id')
/**
 * @swagger
 * path:
 *  /project/:project_id:
 *    get:
 *      summary: Le service qui permet de récupérer un projet avec son identifiant
 *      tags: [Projects]
 *      parameters:
 *       - name: project_id
 *         description: l'identifiant du projet à modifier
 *         required: true
 *         type: string 
 *      responses:
 *        "200":
 *          description: les données ont été récuprérées avec succés
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/getProjectById'
 *        "500":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                  message:
 *                    type: string
 *                example:
 *                    status: error
 *                    message: not found any relative data
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
 *          description: les données ont été modifié avec succéss
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/getProjectById'
 * 
 *        "500":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                  message:
 *                    type: string
 *                example:
 *                    status: error
 *                    message: not found any relative data
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
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example:
 *                    message: le projet a été supprimé avec succés
 *        "500":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example:
 *                    message: Une erreur est survenue..
 */
    .delete(projectController.delete); 
    

router.route('/projects/users/:email')
/**
 * @swagger
* path:
 *  /project/users/:email:
 *    get:
 *      summary: Le service qui permet de récupérer les projets d'un utilisateur
 *      tags: [Projects]
 *      parameters:
 *       - name: email
 *         description: l'email de l'utilisateur
 *         required: true
 *         type: string 
 *      responses:
 *        "200":
 *          description: les données ont été récuprérées avec succés
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Projects'
 *        "500":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example:
 *                    message: Une erreur est survenue..
 */
    .get(projectController.getProjects);
router.route('/projects/:project_id/sprints')
/**
 * @swagger
* path:
 *  /project/:project_id/sprints:
 *    get:
 *      summary: Le service qui permet de récupérer les sprints d'un projet
 *      tags: [Projects]
 *      parameters:
 *       - name: project_id
 *         description: l'identifiant du projet à modifier
 *         required: true
 *         type: string 
 *      responses:
 *        "200":
 *          description: les données ont été récuprérées avec succés
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                  message: 
 *                    type: string
 *                  data: 
 *                    type: array
 *                    properties:
 *                      status:
 *                       type: string
 *                      start_date:
 *                       type: string
 *                      end_date: 
 *                       type: string
 *                      id:
 *                       type: string
 *                      title:
 *                       type: string
 *                      ordre:
 *                       type: Number
 *                      description:
 *                       type: boolean
 *                      issues:
 *                       type: array
 *                       properties:
 *                          id:
 *                           type: string
 *                example:
 *                    status: success
 *                    message: sprints retrieved successfully
 *                    data:                             
 *                      - status: toDo
 *                        start_date: YYYY-MM-dd
 *                        end_date: YYYY-MM-dd
 *                        id: 5da8915e0cc4c80f68cb8332
 *                        title: title of the sprint
 *                        ordre: 1
 *                        description: amirouche
 *                        issues: 
 *                           - issue_id: 5da8915e0cc4c80f68cb8332
 *                           - issue_id: 5da8915e0cc4c80f68cb8332  
  *                      - status: toDo
 *                        start_date: YYYY-MM-dd
 *                        end_date: YYYY-MM-dd
 *                        id: 5da8915e0cc4c80f68cb8332
 *                        title: title of the sprint
 *                        ordre: 1
 *                        description: descirption of the sprint
 *                        issues: 
 *                           - issue_id: 5da8915e0cc4c80f68cb8332
 *                           - issue_id: 5da8915e0cc4c80f68cb8332  
 *        "500":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                example:
 *                    message: Une erreur est survenue..
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