// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// Initialise the app
let app = express();


app.get("/users", (req, res, next) => {
    const userOne = new User("Alexander", "fake@gmail.com");
    const userTwo = new User("Ryan", "fakeagain@gmail.com");
    res.json({ userOne, userTwo });
  });
/*
//Initialise swagger 
 
const swaggerDefinition = {
  info: {
      title: 'Gestion des taches',
      version: "1.0.0",
      description: 'Outil de gestion des taches',
      contact: {
          name: 'Maryem Elazbaoui',
      },
      servers: ["http://localhost:8080"]
  }
};
 
const options = {
  swaggerDefinition,
  apis: ['api-routes.js', './controllers/*', './models/*'],
};
 
let swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
*/

// Swagger set up
const options = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Time to document that Express API you built",
        version: "1.0.0",
        description:
          "A test project to understand how easy it is to document and Express API",
        license: {
          name: "MIT",
          url: "https://choosealicense.com/licenses/mit/"
        },
        contact: {
          name: "Swagger",
          url: "https://swagger.io",
          email: "Info@SmartBear.com"
        }
      },
      servers: [
        {
          url: "http://localhost:3000/api/v1"
        }
      ]
    },
    apis: ["./models/*", "api-routes.js"]
  };
  const swaggerSpec = swaggerJsdoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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