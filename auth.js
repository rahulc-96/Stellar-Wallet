var User=require('./usermodel');
var bcrypt = require('bcryptjs');
const express=require('express')
const bodyparser=require('body-parser');
var StellarSdk = require('stellar-sdk');
var pair = StellarSdk.Keypair.random();
const app=express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
var apps=require('./app.js');
var message = '';
app.post('/',(req,res,next)=>{
 var dbconnect=require('./mongodb_connect.js');
  User.findOne({
    username:req.body.username,
    isVerified:true
  },
  function(err, user) {
    if (err) console.log(err);
    if (!user) {
      messages = 'sorry account with specified username doesnt exist';
      res.render('login', { messages:messages });
    }
    else if (user)
    {

      //compare login password with password on database

      console.log(req.body.password);
       var pass= bcrypt.compareSync(req.body.password, user.password);
       console.log(pass);
        if (!pass) {
            messages = 'sorry invalid username or password';
            res.render('login', { messages:messages });
      }
      else if(pass){
	var userid = req.body.username;

  req.session.user=userid;
	console.log(user.address);
	var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
        var promise = server.loadAccount(user.address).then(function (account) {
      		//console.log('Balances for account: ' + pair.publicKey());
      		account.balances.forEach(function (balance) {
		        	console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
					bal = balance.balance;
					console.log(userid+"your balance:"+ bal);
				    var update=userid+" your balance:"+ bal;
				    console.log(update)
				     promise.then(res.render('profile',{update: update,username:userid,address:user.address,email:user.email}));

      		});
    	}).catch(function (err) {
      	console.error(err);
    	});
      }

    }
  })
  });
  module.exports=app;
