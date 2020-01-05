const mongoose = require('mongoose');
/**
 * @swagger
 *  components:
 *    schemas:
 *      Comment:
 *        type: object
 *        required:
 *          - user_id
 *          - message
 *          - issue_id
 *        properties:
 *          user_id:
 *            type: string
 *          message:
 *            type: string
 *          issue_id:
 *            type: string
 *          create_date:
 *            type: string
 *            description: La date de la création du projet.
 *        example:
 *           user_id: XXXXXXXXXXXXXX
 *           message: un
 *           issue_id: XXXXXXXXXXXXXXXXXx
 *      Comments:
 *        type: object
 *        properties:
 *          status:
 *              type: string
 *          message:
 *              type: string
 *          data: 
 *              type: array
 *              properties:
 *                  user_id:
 *                      type: string
 *                  message:
 *                      type: string
 *                  issue_id:
 *                      type: string
 *                  create_date:
 *                      type: string
 *        example:
 *           status: success
 *           message: comments retrieved successfully
 *           data:
 *              - user_id: XXXXXXXXXXXXXX
 *                id: 5dc42a0b0effd12d04245eba
 *                message: un commentaire
 *                issue_id: XXXXXXXXXXXXXXXXXx
 *                create_date: 2020-01-05T15:46:38.929Z
 *              - user_id: XXXXXXXXXXXXXX
 *                id: 5dc42a0b0effd12d04245eba
 *                message: un autre commentaire
 *                issue_id: XXXXXXXXXXXXXXXXXx
 *                create_date: 2020-01-05T15:46:38.929Z
 *      getCommentById:
 *        type: object
 *        properties:
 *          status:
 *              type: string
 *          message:
 *              type: string
 *          data: 
 *              type: object
 *              properties:
 *                  user_id:
 *                      type: string
 *                  message:
 *                      type: string
 *                  issue_id:
 *                      type: string
 *                  create_date:
 *                      type: string
 *        example:
 *           status: success
 *           message: comments information retrieved successfully
 *           data:
 *              - user_id: XXXXXXXXXXXXXX
 *                id: 5dc42a0b0effd12d04245eba
 *                message: un commentaire
 *                issue_id: XXXXXXXXXXXXXXXXXx
 *                create_date: 2020-01-05T15:46:38.929Z
 * */
const commentSchema = mongoose.Schema({
    create_date: {
        type: Date,
        default: Date.now
    },
    message:{
        type: String
    },
    user_id: { 
        type: String, 
    },
    issue_id: { 
        type: String, 
    }

});


// Export comment model
const Comment = module.exports = mongoose.model('comment', commentSchema);
module.exports.get = function (callback, limit) {
    Comment.find(callback).limit(limit);
}