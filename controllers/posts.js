module.exports = function(app) {

  // CREATE
  app.post('/posts', function(req,res) {
    console.log(req.body)
  });

};
