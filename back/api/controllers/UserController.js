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
    // facebook api call with the necessary fields
    fb.api('me', {fields: ['id', 'name', 'email', 'first_name', 'last_name']}, response => {
      // Make sure that the user give his email
      if (response.email === undefined) {
        return res.status(403).send({status: 'error', message: 'The email address is required'})
      } else if (!response || response.error) {
        return res.status(403).send({status: 'error', message: 'An error has occured'})
      }
      // Search user by email
      // If found, continue
      // else create a new one and continue
      User.findOrCreate(
        {
          'email': response.email
        },
        {
          'firstName': response.first_name,
          'lastName': response.last_name,
          'email': response.email,
          'facebookId': response.id
        })
        .exec(async (err, user) => {
          if (err) { // Return error if any
            return res.serverError(err);
          }
          // Set jason web token with the needed information
          var token = jwt.sign({
            'userId': user.id,
            'firstName': user.firstName,
            'lastName': user.lastName,
            'email': user.email
          }, sails.config.constant.secretToken, {'expiresIn': 60 * 60 * 24})
          return res.status(200).json(token);
        });
    });
  }

};

