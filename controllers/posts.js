var Post = require('../models/post');
var jwt = require('jsonwebtoken');
var User = require('../models/User');

/*
  get '/' show all posts
  get '/posts' show all posts
  get '/posts/:id' show a single post

  get '/posts/new' show new post form
  post '/posts/new' submit new post form saves a post
*/
// SHOW POSTS get '/' show all posts
module.exports = (app) => {
  // Index route - show all posts
  app.get('/', function (req, res) {
  var currentUser = req.user;

  Post.find({}).then((posts) => {
    res.render('posts-index', { posts, currentUser })
  }).catch((err) => {
    console.log(err.message);
  });
})
  //Allwos topost a new post including the subreddit it is in
  app.get('/posts/new', (req, res) => {
    const currentUser = req.user;
    res.render('posts-new', { currentUser });
  })

  //SHOW SINGLE POST by id ROUTE
  app.get('/posts/:id', (req, res) => {
     // LOOK UP THE POST
     Post.findById(req.params.id).populate('comments').then((post) => {
       const currentUser = req.user;
       res.render('post-show', { post, currentUser });
     }).catch((err) => {
       console.log(err.message);
     })
   })



  // CREATE POST
  app.post('/posts', function (req, res) {

         // If not logged in, do this
         if (req.user == null) {
             res.redirect('/login');
             return
         }

         // INSTANTIATE INSTANCE OF POST MODEL
         var post = new Post(req.body);

         User.findById(req.user._id).then((user) => {
             post.author = user
             return post.save()
         }).then(() => {
             res.redirect('/posts/'+ post._id)
         }).catch((err) => {
             console.log(err.message, "Could not save post!")
             res.redirect('/posts/new')
         })



     })
// Route to create subreddits when it is created in the post itself

 app.post('/n/:subreddit',(req, res) => {
   post.save().then((post) => {
     res.redirect('/n/:subreddit');
   }).catch((err) => {
     console.log(err.message)

   })
 });

///route to display all the post that follow a particular sub reddit
 app.get('/n/:subreddit',(req, res) => {
   //console.log(req.params.subreddit)

   Post.find({subreddit:req.params.subreddit}).then((post) => {
     var currentUser = req.user;
       res.render('subreddit', {post, currentUser: currentUser});
     }).catch((err) => {
         console.log("no page to be found");
     })
 });
//LOGOUT ROUTE
   app.get('/logout', function(req, res, next) {
    res.clearCookie('nToken');

    res.redirect('/');
  });
  // associating the user with their posts and comments

}
