var Post = require('../models/post');

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
  app.get('/', (req, res) => {
    Post.find().then((posts) => {
      var currentUser = req.user;
      res.render('posts-index', { posts, currentUser: currentUser});
    }).catch((err) => {
      console.log(err.message);
    })
  })
  //Allwos topost a new post including the subreddit it is in
  app.get('/posts/new', (req, res) => {

    res.render('posts-new', {currentUser: currentUser});
  })

  //SHOW SINGLE POST by id ROUTE
  app.get('/posts/:id', (req, res) => {
     // LOOK UP THE POST

     Post.findById(req.params.id).populate('comments').then((post) => {
       var currentUser = req.user;
       res.render('post-show', { post: post,currentUser: currentUser });
     }).catch((err) => {
       console.log(err.message);
     })
   })



  // CREATE POST
app.post('/posts',function(req, res) {
  // INSTANTIATE INSTANCE OF POST MODEL

  //Post.findById(req.params.id).populate('comments').exec(function (err, post) {
    //res.render('posts-show', { post: post })
    console.log(req.body);

    var post = new Post(req.body);

    post.save().then((post) => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message)
    })
  });

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
}
