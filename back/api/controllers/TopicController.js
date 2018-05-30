var jwt = require('jsonwebtoken')
/**
 * TopicController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  /**
   * @description Create topic using title, message, and user
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  create: async (req, res) => {
    // Get jwt, verify it with secret code, and get the userId
    const userId = jwt.verify(req.headers['x-access-token'], sails.config.constant.secretToken).userId
    // find user using his id
    const user = await User.find({id: userId})
    // If user does not exist, return an error
    if (user.length === 0) {
      return res.status(403).send({success: false, message: 'User does not exist'})
    }
    // If user exists, create a topic using his id
    let createdTopic = await Topic.create({
      'title': req.param('title'),
      'content': req.param('message'),
      'author': userId
    })
    // Return an error if something does not match the model
      .intercept(err => {
        return res.status(403).send({success: false, message: err.message})
      }).fetch()
    // Return the created topic
    return res.json(createdTopic)
  },

  /**
   * @description Display list of topics in different pages
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  index: async (req, res) => {
    // Get the sorting parameter and display it in the correct way for database
    const sort = req.param('sort') === 'recent' ? 'createdAt DESC' : 'rates DESC'
    // Get the page parameter, parse it and then check if it is an integer
    // If not integer, set the default value, which is 1
    const page = Number.isInteger(parseInt(req.param('page'))) ? parseInt(req.param('page')) : 1
    // Number of topics to be displayed per page
    const perPage = 50
    // Get the number of topics
    const total = await Topic.count()
    // Compute the number of pages needed to display all the topics
    const pageCount = Math.ceil(total / perPage)

    // Find topics for the selected page and in the right order
    // To get the right topics for the selected page:
    // - Limit the number of topics to 50 per page
    // - Skip topic already displayed in other pages by multiplying the number of topics per page by the number of previous pages
    var topics = await Topic.find({limit: perPage, skip: (page - 1) * perPage}).populate('author').sort(sort)
    // return the topics and the pagination information
    return res.status(200).send({
      message: 'success',
      items: topics, // list of topics
      meta: { // Pagination information
        page, // Current page number
        perPage, // list of topics to be displayed per page
        pageCount, // Number of pages
        total, // total number of topics
        nextPage: page + 1 > pageCount ? false : page + 1, // next page number, if the number exceeds the number of pages, return false
        previousPage:  page - 1 < 1 ? false : page - 1 // previous page number, if the number exceeds the number of pages, return false
      }
    })
  },

  /**
   * @description Upvote a topic
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  upvote: async (req, res) => {
    // Get jwt, verify it with secret code, and get the userId
    const userId = jwt.verify(req.headers['x-access-token'], sails.config.constant.secretToken).userId
    // Get topic with id
    const topic = await Topic.findOne({id: req.param('id')})
    // Find if user already upvoted the topic
    const upvote = await Upvote.findOne({
      user: userId,
      topic: req.param('id')
    })

    //
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

    res.status(200).send(incrementedRate.toString())
  },

  /**
   * @description Get information about a specific topic
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  show: async (req, res) => {
    const topic = await Topic.findOne({
      id: req.param('id')
    }).populate('author')
    if (topic === null || topic === undefined) {
      return res.status(403).send({message: 'The topic '+ req.param('id')+ ' does not exist'})
    }
    return res.status(200).send({topic})
  }

};
