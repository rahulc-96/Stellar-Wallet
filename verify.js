var express=require('express');
var app=express();
var apps=require('./app.js');
var url=require('url');
var Token=require('./verifymodel.js')
var User=require('./usermodel.js')
app.get('/',function(req,res){
  var dbconnect=require('./mongodb_connect.js');
  urlparse=url.parse(req.url,true);
  id=urlparse.query.id;
  Token.findOne({ token: id }, function (err, token) {

        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
        User.findOne({ _id:token._userId }, function (err, user) {
                 if(user){
                   user.isVerified = true;
                   user.save();
                   console.log(user);
                   var messages='successfully verified.login to activate your account';
                   res.render('login',{ messages:messages });
                 }
                    if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
                  });


});

});
module.exports=app;
