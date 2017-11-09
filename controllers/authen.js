
module.exports = function(app) {
      // CREATE

// Route for entering the user infromation for the sign up
    app.get('/signup', function (req, res) {
      res.render('signup', {msg: 'Sign Up'});
    })
    //Route to login to the site
    app.get('/login', function (req, res) {
      res.render('login', {msg: 'Login'});
    })

// SIGN UP POST- handles the user authentication and JWTs
    app.post('/sign-up', function(req, res, next) {
      // Create User and JWT
      var user = new User(req.body);

      user.save(function (err) {
        if (err) { return res.status(400).send({ err: err }) }

        res.redirect('/');
      })
    });
}
