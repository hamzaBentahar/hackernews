import jwt from 'jsonwebtoken'

/**
 * CommentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  'create': async function(req, res){
    const userId = jwt.verify(req.headers['x-access-token'], sails.config.constant.secretToken).userId

    var user = await User.find({id: userId})
    if (user.length === 0) {
      return res.status(403).send({success: false, message: 'User does not exist'})
    }

    const topic = await Topic.findOne({
      id: req.param('topic')
    })

    if (topic === undefined) {
      return res.status(403).send({success: false, message: 'Topic does not exist'})
    }

    let createdComment = await Comment.create({
      'topic': req.param('topic'),
      'content': req.param('content'),
      'user': userId
    })
      .intercept(err => {
        return res.status(403).send({success: false, message: err.message})
      }).fetch()
    let comment = await Comment.findOne({
      'id': createdComment.id
    }).populate('user')
    return res.json(comment)
  },

  'index': async function(req, res){
    let comments = await Comment.find({
      topic: req.param('topic')
    }).populate('user').sort('createdAt DESC')
    return res.status(200).send({comments})
  }
};

