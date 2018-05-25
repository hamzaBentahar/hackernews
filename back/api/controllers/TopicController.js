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
    const sort = req.param('sort') === 'recent' ? 'createdAt DESC' : 'rates DESC'
    const page = parseInt(req.param('page'))
    const perPage = 50
    const total = await Topic.count()
    const pageCount = Math.ceil(total / perPage)

    var topics = await Topic.find({limit: 50, skip: (page - 1) * perPage}).sort(sort)
    return res.send({
      message: 'success',
      items: topics,
      meta: {
        page,
        perPage,
        pageCount,
        total,
        nextPage: page + 1 > pageCount ? false : page + 1,
        previousPage:  page - 1 < 1 ? false : page - 1
      }
    })
  },

  'upvote': async function(req, res){
    const userId = jwt.verify(req.headers['x-access-token'], sails.config.constant.secretToken).userId
    const topic = await Topic.findOne({
      id: req.param('id')
    })

    const upvote = await Upvote.findOne({
      user: userId,
      topic: req.param('id')
    })

    if (upvote !== undefined){
      return res.status(403).send('You already upvoted this post')
    }

    let incrementedRate = topic.rates + 1

    await Topic.update({
      id: req.param('id')
    }).set({
      rates: incrementedRate
    })

    await Upvote.create({
      user: userId,
      topic: req.param('id')
    })

    res.send(incrementedRate)
  }

};
