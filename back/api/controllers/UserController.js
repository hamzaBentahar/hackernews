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
  login: function (req, res) {
    fb.setAccessToken('EAACbVVy6SsUBAM6H3P5dLUe64kYi0xjLpbZA7eS3aXMEYTIMHZAi5KwfGM4mMNVnldjhphfkQeQIOZAZCBI3senKhAPKQ28vLJrdlPmMMwUe9nSA3gwQukvDpZCtzk7YUTZBXJhZCRd0XL6rqsyzfnsBy9kbKYaRdDSz5PwKlgXWCJjZBPFHJGSS7NMdezy8Tq8PPxmrk1DAqwZDZD')

    fb.api('me', {fields: ['id', 'name', 'email']}, function (res) {
      if (!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
      }
      console.log(res.id);
      console.log(res.name);
      console.log(res.email)
    });

  },

  socialAuth: function (req, res) {
    fb.setAccessToken(req.param('access_token'))
    fb.api('me', {fields: ['id', 'name', 'email', 'first_name', 'last_name']}, function (response) {
      if (!response || response.error) {
        console.log(!response ? 'error occurred' : response.error);
        return;
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

