module.exports = function(app) {
  // CREATE
    app.post('/posts/:postId/comments', function (req, res) {
      // INSTANTIATE INSTANCE OF MODEL
      var comment = new Comment(req.body);

      // SAVE INSTANCE OF POST MODEL TO DB
      comment.save(function (err, comment) {
        // REDIRECT TO THE ROOT
        return res.redirect(`/`);
      })
    });
};
