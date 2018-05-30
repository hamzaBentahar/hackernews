/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var Facebook = require('fb').Facebook,
  fb = new Facebook({}),
  jwt = require('jsonwebtoken');

module.exports = {
  socialAuth: function (req, res) {
    fb.setAccessToken(req.param('access_token')) // Get the facebook access token for the user and store it in fb variable
    // facebook api call with the necessary attributes
    fb.api('me', {fields: ['id', 'name', 'email', 'first_name', 'last_name']}, response => {
      //
      if (!response || response.error) {
        return res.status(403).send({status: 'error', message: 'An error has occured'})
      } else if (response.email === undefined){
        return res.status(403).send({status: 'error', message: 'The email address is required'})
      }
      User.findOrCreate(
        {
          'email': response.email,
          'facebookId': response.id
        },
        {
          'firstName': response.first_name,
          'lastName': response.last_name,
          'email': response.email,
          'facebookId': response.id
        })
        .exec(async (err, user, wasCreated) => {
          if (err) {
            return res.serverError(err);
          }

          if (wasCreated) {
            sails.log('Created a new user: ' + user.firstName);
          } else {
            sails.log('Found existing user: ' + user.firstName);
          }
          var token = jwt.sign({
            'userId': user.id,
            'firstName': user.firstName,
            'lastName': user.lastName,
            'email': user.email
          }, 'secret', {'expiresIn': 60 * 60 * 24})
          res.status(200).json(token);
        });
      // res.send(user)
    });
  }

};

