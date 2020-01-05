// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
let swaggerjsdoc = require('swagger-jsdoc');
let swaggerUi = require('swagger-ui-express');
// Initialise the app
let app = express();

//Initialise swagger 
 
const swaggerDefinition = {
  info: {
      title: 'Gestion des taches',
      version: "1.0.0",
      description: 'Outil de gestion des taches',
      contact: {
          name: 'Maryem Elazbaoui',
      },
      servers: ["http://localhost:5000"]
  }
};
 
const options = {
  swaggerDefinition,
  apis: ['api-routes.js'],
};
 
let swaggerSpec = swaggerjsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "x-access-token ,Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db!")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8080;
// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running upec_jira_backend on port " + port);
});