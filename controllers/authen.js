var jwt = require('jsonwebtoken');
var User = require('../models/user');
var mongoose = require('mongoose');
module.exports = (app) => {
      // CREATE

// Route for entering the user infromation for the sign up
    app.get('/signup', (req, res, next) => {
      var currentUser = req.user;
      res.render('signup', {currentUser: currentUser});
    })

    // LOGIN FORM
app.get('/login', function(req, res, next) {
  res.render('login');
});
    //Route to login to the site
    // LOGIN
  app.post('/login', function(req, res, next) {
    User.findOne({ email: req.body.email }, "+password", function (err, user) {
      if (!user) { return res.status(401).send({ message: 'Wrong email or password' }) };
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (!isMatch) {
          return res.status(401).send({ message: 'Wrong email or password' });
        }

        var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });

        res.redirect('/');
      });
    })
  });

// SIGN UP POST- handles the user authentication and JWTs
    app.post('/signup', function (req, res, next) {
      // Create User and JWT

      let user = new User(req.body);
      user.save(function (err) {
        if (err) { return res.status(400).send({ err: err }) }

        var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });

        res.redirect('/');
      })
    });

}
