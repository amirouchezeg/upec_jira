// userModel.js
var mongoose = require('mongoose');
// Setup schema

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - last_name
 *          - first_name
 *          - email
 *          - password
 *        properties:
 *          last_name:
 *            type: string
 *          first_name:
 *            type: string
 *          password:
 *            type: string
 *            descritpion: le mot de passe doit contenir 8 caractères 
 *          email:
 *            type: string
 *            format: email
 *            description: L'email de l'utilisateur, il doit etre unique.
 *          create_date:
 *            type: string
 *            description: La date de la création de l'utilisateur.
 *        example:
 *           last_name: Elazbaoui 
 *           first_name: maryem
 *           email: ma.elazbaoui@gmail.com
 *           password: xxxxxxxx,
 *           create_date: 2019-01-01
 *      PostUser:
 *        example:
 *           message: created successfuly
 *           _id: 5e1075b64e1dac4a08464afd
 *           last_name: Elazbaoui
 *           first_name: maryem
 *           email: ma.elazbaoui@gmail.com
 *           password: $2a$08$VSwpcEoB0XszTwJKTVO6VeiIW.vqDxjH916NqK74B6WbJl.42QU3S
 *           create_date: 2019-01-01
 *      getUser:
 *        example:
 *           message: retrieved successfuly
 *           _id: 5e1075b64e1dac4a08464afd
 *           last_name: Elazbaoui
 *           first_name: maryem
 *           email: ma.elazbaoui@gmail.com
 *           create_date: 2019-01-01
 *      login:
 *        example:
 *           message: loged successfuly
 *           _id: 5e1075b64e1dac4a08464afd
 *           last_name: Elazbaoui
 *           first_name: maryem
 *           email: ma.elazbaoui@gmail.com
 *           password: $2a$08$VSwpcEoB0XszTwJKTVO6VeiIW.vqDxjH916NqK74B6WbJl.42QU3S
 *           create_date: 2019-01-01
 *      editePassword:
 *        example:
 *           old_password: XXXXXXX
 *           new_password: 123456
 *           confirmed_password: 123456
 */
var userSchema = mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        max:255
    },
    first_name: {
        type: String,
        required: true,
        max:255
    },
    last_name: {
        type: String,
        required: true,
        max:255
    },
    password: {
        type: String,
        required: true,
        min:6
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export User model
var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}