var express = require('express')
,register=require('./register')
,path = require('path')
,auth=require('./auth')
,cookieParser = require('cookie-parser')
,bodyParser = require("body-parser")
,session = require('express-session')
,flash = require('connect-flash-plus');
var app = express();
const authRoute=require('./auth');
const Register=require('./register');
const mail=require('./sendmail');
const Pay=require('./pay');
const user = require('./usermodel.js');
const verification=require('./verify');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//session
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
app.use(cookieParser());
app.use(flash());
//middleware to check if cookie exists
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});
//middleware to check logged in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.render('profile');
    } else {
        res.render('login');
    }
};


//routes
app.get('/',sessionChecker,function(req,res){
  res.render('login');
});
app.get('/profile',sessionChecker,function(req,res){
  res.render('profile');
});
app.get('/signup',function(req,res){
  res.render('signup');
});
app.get('/login',sessionChecker,function(req,res){
  res.render('login');
});
app.get('/logout',function(req,res){
      messages = 'logged out succesfully';
      res.render('login', { messages:messages });
      req.session.destroy();
});
//route for auth and register
app.use('/register',Register);
app.use('/auth',authRoute);
app.use('/send',mail);
app.use('/pay',Pay);
app.use('/verify',verification);
app.use(express.static(path.join(__dirname,'public')));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.listen(8080,()=>console.log('listening on port 8080'))
