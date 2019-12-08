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
.post(userController.new);
router.route('/users/login')
.post(userController.login);
router.route('/users/:user_id')
    .get(VerifyToken,userController.view)
    .patch(VerifyToken,userController.update)
    .put(VerifyToken,userController.update)
    .delete(VerifyToken,userController.delete);


// Import sprint controller
var sprintController = require('./controllers/sprintController');
// sprint routes
router.route('/sprints')
.get(sprintController.index)
.post(sprintController.new);
router.route('/sprints/:sprint_id')
    .get(sprintController.view)
    .patch(sprintController.update)
    .put(sprintController.update)
    .delete(sprintController.delete);

router.route('/sprints/:sprint_id/issues')
    .get(sprintController.getIssues)

router.route('/users/:user_id/projects')
    .get(sprintController.getIssues)


// Import issue controller
var issueController = require('./controllers/issueController');
// issue routes
router.route('/issues')
.get(issueController.index)
.post(issueController.new);
router.route('/issues/:issue_id')
    .get(issueController.view)
    .put(issueController.update)
    .delete(issueController.delete);  


// Import project controller
var projectController = require('./controllers/projectController');
// project routes
router.route('/projects')
.get(projectController.index)
.post(projectController.new);
router.route('/projects/:project_id')
    .get(projectController.view)
    .put(projectController.update)
    .delete(projectController.delete);  

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