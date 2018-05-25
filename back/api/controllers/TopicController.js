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
      'content': req.param('message'),
      'author': userId
    })
      .intercept(err => {
        return res.status(403).send({success: false, message: err.message})
      }).fetch()
    return res.json(createdTopic)
  },

  'index': async function (req, res) {
    const sort = req.param('sort')
    const page = parseInt(req.param('page'))
    const perPage = 50
    var topics = await Topic.find({limit: 50, skip: (page - 1) * perPage}).sort('createdAt DESC')
    const total = await Topic.count()
    const pageCount = Math.ceil(total / perPage)

    let nextPage = page + 1
    if (nextPage > pageCount){
      nextPage = false
    }
    let previousPage = page - 1
    if (previousPage < 1){
      previousPage = false
    }

    let data = {
      message: 'success',
    }
    data.items = topics
    data.meta = {
      page,
      perPage,
      pageCount,
      total,
      nextPage,
      previousPage
    }
    return res.send(data)
  }

};
