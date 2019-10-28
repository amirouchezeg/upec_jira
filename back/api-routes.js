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
router.route('/users')
.get(userController.index)
.post(userController.new);
router.route('/users/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);

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

// Import issue controller
var issueController = require('./controllers/issueController');
// sprint routes
router.route('/issues')
.get(issueController.index)
.post(issueController.new);
router.route('/issues/:issue_id')
    .get(issueController.view)
    .patch(issueController.update)
    .put(issueController.update)
    .delete(issueController.delete);  
// Export API routes
module.exports = router;

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
// Export API routes
module.exports = router;