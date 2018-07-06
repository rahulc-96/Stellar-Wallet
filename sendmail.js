var express=require('express');
var nodemailer = require("nodemailer");
var app=express();
var url=require('url');
var randtoken = require('rand-token');
var Token=require('./verifymodel.js');
var User=require('./usermodel.js');
var crypto = require('crypto');
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "bosetester19@gmail.com",
        pass: "zeusbomber"
    }
});
var rand,mailOptions,host,link;
app.get('/',function(req,res){
  urlparse=url.parse(req.url,true);
  id=urlparse.query.id;
  var hashtoken=crypto.randomBytes(16).toString('hex');
  var tokens = new Token({ _userId:id, token:hashtoken });
  tokens.save();
  urlparse=url.parse(req.url,true);
  emails=urlparse.query.emailid;
  console.log(emails);
    host=req.get('host');
    link="http://"+req.get('host')+"/verify?id="+hashtoken;
    mailOptions={
        to : emails,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.render('verification');
         }
});
});

module.exports=app;
