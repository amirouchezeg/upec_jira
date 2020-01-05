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
.get(VerifyToken,userController.index)
    /**
 * @swagger
 * /users:
 *  post:
 *    description: Creer un utilisateur
 *    responses:
 *      '200':
 *          description: a successful response
 *      '400':
 *          description: une erreur 
 * 
 */
.post(userController.new);
router.route('/users/login')
    /**
 * @swagger
 * /users:
 *  post:
 *    description: Pour s'authentifier ou s'enregistrer à l'application
 *    responses:
 *      '200':
 *          description: a successful response
 *      '400':
 *          description: une erreur 
 * 
 */
.post(userController.login);
router.route('/users/:_id/edit_password')
    /**
 * @swagger
 * /users:
 *  post:
 *    description: Modifier son mot de passe
 *    responses:
 *      '200':
 *          description: a successful response
 *      '400':
 *          description: une erreur 
 * 
 */
.post(userController.changePassword);
router.route('/users/:user_id')
    /**
 * @swagger
 * /users:
 *  post:
 *    description: Récuperer un utilisateur
 *    responses:
 *      '200':
 *          description: a successful response
 *      '400':
 *          description: une erreur 
 * 
 */
    .get(VerifyToken,userController.view)
    .patch(VerifyToken,userController.update)
/**
 * @swagger
 * /users:
 *  post:
 *    description: Modifier un utilisateur
 *    responses:
 *      '200':
 *          description: a successful response
 *      '400':
 *          description: une erreur 
 * 
 */
    .put(VerifyToken,userController.update)
/**
 * @swagger
 * /users:
 *  post:
 *    description: Supprimer un utilisateur
 *    responses:
 *      '200':
 *          description: a successful response
 *      '400':
 *          description: une erreur 
 * 
 */
    .delete(VerifyToken,userController.delete);
router.route('/users/resend_email')
/**
 * @swagger
 * /users:
 *  post:
 *    description: Envoyer un mail a l'utilisateur pour s'inscrire a un projet
 *    responses:
 *      '200':
 *          description: a successful response
 *      '400':
 *          description: une erreur 
 * 
 */
.post(userController.sendemail);
router.route('/users/check_email/:token')
.get(VerifyToken,userController.checkemail);
router.route('/users/send_email_check/:id')
.get(VerifyToken,userController.send_email_check);

var sprintController = require('./controllers/sprintController');
// sprint routes
router.route('/sprints')
/**
 * @swagger
 * /sprints:
 *  post:
 *    description: Récupérer toutes les sprints
 *    responses:
 *      '200':
 *          description: a successful response
 *      '400':
 *          description: une erreur 
 * 
 */
.get(VerifyToken,sprintController.index)
/**
 * @swagger
 * /sprints:
 *  post:
 *    description: creer un nouveau sprint
 *    responses:
 *      '200':
 *          description: a successful response
 *      '400':
 *          description: une erreur 
 * 
 */
.post(VerifyToken,sprintController.new);
router.route('/sprints/:sprint_id')
/**
 * @swagger
 * /sprints:
 *  post:
 *    description: Récupérer un sprint avec son identifiant
 *    responses:
 *      '200':
 *          description: a successful response
 *      '400':
 *          description: une erreur 
 * 
 */
    .get(VerifyToken,sprintController.view)
    .patch(VerifyToken,sprintController.update)
    .put(VerifyToken,sprintController.update)
    /**
 * @swagger
 * /sprints:
 *  post:
 *    description: Supprimer un sprint
 *    responses:
 *      '200':
 *          description: a successful response
 *      '400':
 *          description: une erreur 
 * 
 */
    .delete(VerifyToken,sprintController.delete);


router.route('/sprints/:sprint_id/issues')
/**
 * @swagger
 * /sprints:
 *  post:
 *    description: Récupérer toutes les taches d'un sprint
 *    responses:
 *      '200':
 *          description: a successful response
 *      '400':
 *          description: une erreur 
 * 
 */
    .get(VerifyToken,sprintController.getIssues)

router.route('/users/:user_id/projects')
/**
 * @swagger
 * /sprints:
 *  post:
 *    description: Récupérer toutes les taches d'un seul utilisateur dans un sprint
 *    responses:
 *      '200':
 *          description: a successful response
 *      '400':
 *          description: une erreur 
 * 
 */
    .get(VerifyToken,sprintController.getIssues)


// Import issue controller
var issueController = require('./controllers/issueController');
// issue routes
router.route('/issues')
/**
 * @swagger
 * /issues:
 *  post:
 *    description: Récupérer toutes les taches dans la base de données
 *    responses:
 *      '200':
 *          description: a successful response
 *      '400':
 *          description: une erreur 
 * 
 */
.get(VerifyToken,issueController.index)
/**
 * @swagger
 * /issues:
 *  post:
 *    description: Créer une nouvelle tache
 *    responses:
 *      '200':
 *          description: a successful response
 *      '400':
 *          description: une erreur 
 * 
 */
.post(VerifyToken,issueController.new);
router.route('/issues/:issue_id')
/**
 * @swagger
 * /issues:
 *  post:
 *    description: Récupérer une tache avec son identifiant
 *    responses:
 *      '200':
 *          description: a successful response
 *      '400':
 *          description: une erreur 
 * 
 */
    .get(VerifyToken,issueController.view)
    /**
 * @swagger
 * /issues:
 *  post:
 *    description: Modifier une tache
 *    responses:
 *      '200':
 *          description: a successful response
 *      '400':
 *          description: une erreur 
 * 
 */
    .put(VerifyToken,issueController.update)
    /**
 * @issues
 * /projects:
 *  post:
 *    description: Supprimer une tache avec son identifiant
 *    responses:
 *      '200':
 *          description: a successful response
 *      '400':
 *          description: une erreur 
 * 
 */
    .delete(VerifyToken,issueController.delete);




// Import project controller
var projectController = require('./controllers/projectController');
router.route('/projects')
/**
 * @swagger
 * /projects:
 *  post:
 *    description: Récupérer tous les projets dans la base de données
 *    responses:
 *      '200':
 *          description: a successful response
 *      '400':
 *          description: une erreur 
 * 
 */
.get(VerifyToken,projectController.index)
/**
 * @swagger
 * /projects:
 *  post:
 *    description: create a new project
 *    responses:
 *      '200':
 *          description: a successful response
 *      '400':
 *          description: une erreur 
 * 
 */
.post(VerifyToken,projectController.new);
router.route('/projects/:project_id')
/**
 * @swagger
 * /projects:
 *  post:
 *    description: Récupérer un projet avec son identifiant
 *    responses:
 *      '200':
 *          description: a successful response
 *      '400':
 *          description: une erreur 
 * 
 */
    .get(VerifyToken,projectController.view)
    /**
 * @swagger
 * /projects:
 *  post:
 *    description: Modifier un projet avec son identifiant
 *    responses:
 *      '200':
 *          description: a successful response
 *      '400':
 *          description: une erreur 
 * 
 */
    .put(VerifyToken,projectController.update)
    /**
 * @swagger
 * /projects:
 *  post:
 *    description: Supprimer un projet avec son identifiant
 *    responses:
 *      '200':
 *          description: a successful response
 *      '400':
 *          description: une erreur 
 * 
 */
    .delete(VerifyToken,projectController.delete); 
    

router.route('/projects/users/:email')
/**
 * @swagger
 * /projects:
 *  post:
 *    description: Récupérer tous les utilisateurs d'un projet 
 *    responses:
 *      '200':
 *          description: a successful response
 *      '400':
 *          description: une erreur 
 * 
 */
    .get(VerifyToken,projectController.getProjects);
router.route('/projects/:project_id/sprints')
/**
 * @swagger
 * /projects:
 *  post:
 *    description: Récupérer toutes les sprints d'un projet
 *    responses:
 *      '200':
 *          description: a successful response
 *      '400':
 *          description: une erreur 
 * 
 */
    .get(VerifyToken,projectController.getSprints);

// Import comment controller
var commentController = require('./controllers/commentController');
// comments routes
router.route('/comments')
.get(VerifyToken,commentController.index)
.post(VerifyToken,commentController.new);
router.route('/comments/:comment_id')
    .get(VerifyToken,commentController.view)
    .patch(VerifyToken,commentController.update)
    .put(VerifyToken,commentController.update);

router.route('/issues/:issue_id/comments/:comment_id')
    .delete(VerifyToken,commentController.delete);
// Export API routes
module.exports = router;