//module imports and node
const express = require('express')
const app = express()
const exphbs  = require('express-handlebars');
//bodyparser
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//self defined variables and requirements
const Post = require('./models/post.js');
//Handlebars code fro iidle where
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/putit');

app.use(bodyParser.urlencoded({ extended: true }));

//Routes for navigation MOVE ALL TO THE CONTROLLERS
//Index route
app.get('/', function (req, res) {
  Post.find().then((posts)=>{
    res.render('posts-index', { posts: posts});
  }).catch((err)=>{
    console.log(err.message);
  })

})
//Sign up route
app.get('/signup', function (req, res) {
  res.render('signup', {msg: 'Sign Up'});
})
//Login route
app.get('/login', function (req, res) {
  res.render('login', {msg: 'Login'});
})
//new posts route
app.get('/posts/new', function (req, res) {
  res.render('posts-new', {msg: 'New posts'});
})
//SHOW ROUTE
app.get('/posts/:id', function (req, res) {
   // LOOK UP THE POST
   Post.findById(req.params.id).exec(function(err, post) {

     // RESPOND BY RENDERING THE TEMPLATE
     res.render('post-show', { post: post });
   });
 });
//route for all posts


app.listen(process.env.PORT||3000, function () {
  console.log('Server for PutIt listening on port 3000!')
})

require('./controllers/posts')(app)
