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


// Export API routes
module.exports = router;