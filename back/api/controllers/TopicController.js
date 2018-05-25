var jwt = require('jsonwebtoken')
/**
 * TopicController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  'create': async function (req, res) {
    const userId = jwt.verify(req.headers['x-access-token'], sails.config.constant.secretToken).userId
    var user = await User.find({id: userId})
    if (user.length === 0) {
      return res.status(403).send({success: false, message: 'User does not exist'})
    }
    var createdTopic = await Topic.create({
      'title': req.param('title'),
      'content': req.param('content'),
      'author': userId
    })
      .intercept(err => {
        return res.status(403).send({success: false, message: 'invalid'})
      }).fetch()
    // return res.json(createdTopic)
  }

};
