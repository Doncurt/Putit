//module imports
var express = require('express')
var app = express()
var exphbs  = require('express-handlebars');
require('./controllers/posts.js')(app);
//Routes for navigation
//Index route
app.get('/', function (req, res) {
  res.render('index', {msg: 'put it'});
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

app.listen(process.env.PORT||3000, function () {
  console.log('Server for PutIt listening on port 3000!')
})

//Handlebars code fro iidle where
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
