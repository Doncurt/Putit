var Post = require('../models/post');

module.exports = function(app) {

  // CREATE
  app.post('/posts', function (req, res) {
    // INSTANTIATE INSTANCE OF POST MODEL


    console.log(req.body);

    var post = new Post(req.body);

    post.save().then((post) => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message)
    })

  });
  
};
