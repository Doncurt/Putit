//module imports and node
const express = require('express')
const exphbs  = require('express-handlebars');
var cookieParser = require('cookie-parser')
//bodyparser
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// self defined variables and requirements
const Post = require('./models/post.js');
var Comment = require('./models/comment.js');


const app = express()
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));

require('./controllers/comments.js')(app);
require('./controllers/posts.js')(app);
// Handlebars code for middle where
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



// mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/putit');

// Routes for navigation MOVE ALL TO THE CONTROLLERS

//subreddit routes
//middle wear for authori
var checkAuth = function (req, res, next) {
  console.log("Checking authentication");

  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jsonwebtoken.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next()
}

app.use(checkAuth)


app.listen(process.env.PORT||3000, ()=> {
  console.log('Server for PutIt listening on port 3000!')
})
require('./controllers/authen')(app)
require('./controllers/posts')(app)
require('./controllers/comments')(app)
