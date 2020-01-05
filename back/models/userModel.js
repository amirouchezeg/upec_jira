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
 *          type: object
 *          properties:
 *             message:
 *               type: string
 *             token:
 *               type: string
 *             data:
 *               type: object
 *               properties: 
 *                 id:
 *                   type: string
 *                 last_name:
 *                   type: string
 *                 first_name: 
 *                   type: string
 *                 email:
 *                   type: string
 *                 create_date:
 *                   type: string
 *                 password:
 *                   type: string
 *          example:
 *                    message: New user created!
 *                    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *                    data:                             
 *                        id: 5e1075b64e1dac4a08464afd
 *                        last_name: Elazbaoui
 *                        first_name: maryem
 *                        email: email@gmail.com
 *                        create_date: YYYY-MM-DD
 *                        password: 2a$08$VSwpcEoB0XszTwJ
 *      login:
 *          type: object
 *          properties:
 *             message:
 *               type: string
 *             token:
 *               type: string
 *             data:
 *               type: object
 *               properties: 
 *                 id:
 *                   type: string
 *                 last_name:
 *                   type: string
 *                 first_name: 
 *                   type: string
 *                 email:
 *                   type: string
 *                 create_date:
 *                   type: string
 *                 password:
 *                   type: string
 *          example:
 *                    message: loged successfully
 *                    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *                    data:                             
 *                        id: 5e1075b64e1dac4a08464afd
 *                        last_name: Elazbaoui
 *                        first_name: maryem
 *                        email: email@gmail.com
 *                        create_date: YYYY-MM-DD
 *                        password: 2a$08$VSwpcEoB0XszTwJ
 *      editePassword:
 *          type: object
 *          required:
 *            - email
 *            - oldPassword
 *            - newPassword
 *            - confirmed
 *          properties:
 *             email:
 *               type: string
 *             oldPassword:
 *               type: string
 *             newPassword:
 *               type: object
 *             confirmed:
 *               type: object
 *          example:
 *              email: email@gmail.com
 *              oldPassword: 123456
 *              newPassword: 678901
 *              confirmed: 678901
 *      getUser:
 *          type: object
 *          properties:
 *             message:
 *               type: string
 *             data:
 *               type: object
 *               properties: 
 *                 id:
 *                   type: string
 *                 last_name:
 *                   type: string
 *                 first_name: 
 *                   type: string
 *                 email:
 *                   type: string
 *                 create_date:
 *                   type: string
 *                 password:
 *                   type: string
 *                 email_confirme:
 *                   type: boolean
 *                 email_token:
 *                   type:  boolean
 *          example:
 *                    message: user details loading..
 *                    data:                             
 *                        id: 5e1075b64e1dac4a08464afd
 *                        last_name: Elazbaoui
 *                        first_name: maryem
 *                        email: email@gmail.com
 *                        create_date: YYYY-MM-DD
 *                        password: 2a$08$VSwpcEoB0XszTwJ
 *                        mail_confirme: false 
 *                        mail_token: false
 *      PutUser:
 *          type: object
 *          properties:
 *             message:
 *               type: string
 *             token:
 *               type: string
 *             data:
 *               type: object
 *               properties: 
 *                 id:
 *                   type: string
 *                 last_name:
 *                   type: string
 *                 first_name: 
 *                   type: string
 *                 email:
 *                   type: string
 *                 create_date:
 *                   type: string
 *                 password:
 *                   type: string
 *                 email_confirme:
 *                   type: boolean
 *                 email_token:
 *                   type: boolean
 *          example:
 *                    message: user Info updated
 *                    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *                    data:                             
 *                        id: 5e1075b64e1dac4a08464afd
 *                        last_name: Elazbaoui
 *                        first_name: maryem
 *                        email: email@gmail.com
 *                        create_date: YYYY-MM-DD
 *                        password: 2a$08$VSwpcEoB0XszTwJ
 *                        email_confirme: false
 *                        email_token: false
 *      getProjects:
 *          type: object
 *          properties:
 *             message:
 *               type: string
 *             token:
 *               type: string
 *             data:
 *               type: object
 *               properties: 
 *                 id:
 *                   type: string
 *                 last_name:
 *                   type: string
 *                 first_name: 
 *                   type: string
 *                 email:
 *                   type: string
 *                 create_date:
 *                   type: string
 *                 password:
 *                   type: string
 *                 email_confirme:
 *                   type: boolean
 *                 email_token:
 *                   type: boolean
 *          example:
 *                    message: user Info updated
 *                    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *                    data:                             
 *                        id: 5e1075b64e1dac4a08464afd
 *                        last_name: Elazbaoui
 *                        first_name: maryem
 *                        email: email@gmail.com
 *                        create_date: YYYY-MM-DD
 *                        password: 2a$08$VSwpcEoB0XszTwJ
 *                        email_confirme: false
 *                        email_token: false
 */
var userSchema = mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        max:255
    },
    email_confirme: {
        type: Boolean,
        default:false
    },
    email_token: {
        type: String,
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