var bcrypt = require('bcryptjs');
var User=require('./usermodel');
const express=require('express')
const bodyparser=require('body-parser');
var StellarSdk = require('stellar-sdk');
var request = require('request');
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
const app=express();
var apps=require('./app.js');
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.post('/',(req,res,next)=>{
   if(req.method == "POST"){
     var dbconnect=require('./mongodb_connect.js');
     var post=req.body;
     var hashPassword = bcrypt.hashSync(req.body.password, 8);
     var pair = StellarSdk.Keypair.random();

	console.log(pair.secret());
	console.log(pair.publicKey());
     var NewUser=User({
     username:post.username,
     email:post.email,
     password:hashPassword,
     address:pair.publicKey(),
     seed:pair.secret(),
     admin:true
   });
     NewUser.save(function(err){
       if(err){
       if(err.code===11000){
         message = 'sorry username exist,try another';
         res.render('signup', { message:message });
     }
   }

    else{
     console.log('signed up');
     var messages='account registered successfully';
	request.get({
  		url: 'https://friendbot.stellar.org',
  		qs: { addr: pair.publicKey() },
  		json: true
	}, function(error, response, body) {
  	if (error || response.statusCode !== 200) {
    		console.error('ERROR!', error || body);
  	}
  	else {
console.log('SUCCESS! You have a new account :)\n', body);

    var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    // the JS SDK uses promises for most actions, such as retrieving an account
    server.loadAccount(pair.publicKey()).then(function (account) {
      console.log('Balances for account: ' + pair.publicKey());
      account.balances.forEach(function (balance) {
        console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
      });
    }).catch(function (err) {
      console.error(err);
    });
  	}
	});

  res.writeHead(302, {'Location': 'http://127.0.0.1:8080/send?emailid='+post.email+'&id='+NewUser._id});
     res.end();
   }
 });
}
 else {
      res.render('signup');
   }
 });
 module.exports=app;
