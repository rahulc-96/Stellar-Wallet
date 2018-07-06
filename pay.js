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
global.bal = '';
app.post('/',(req,res,next)=>{
 var dbconnect=require('./mongodb_connect.js');
 user_seed = '';
 user_address = '';
 User.findOne({
     username:req.session.user
 },function(err,user){
     if(user){
         user_seed = user.seed;
         user_address = user.address;
         console.log(user_seed);
         console.log(user.address);
     }
 });
  User.findOne({
    username:req.body.name
  },
  function(err, user1) {
    if (err) throw err;

    if (!user1) {
      messages = 'sorry account with specified username doesnt exist';
      res.render('profile', { messages:messages,failure:'1'});
    }
    else if (user1)
    {
        console.log(req.session.user);
         console.log(user_seed);

      console.log(req.body.amount);
      var StellarSdk = require('stellar-sdk');
        StellarSdk.Network.useTestNetwork();
        var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
        var sourceKeys = StellarSdk.Keypair.fromSecret(user_seed);
        var destinationId = user1.address;
        var transaction;
        server.loadAccount(destinationId).catch(StellarSdk.NotFoundError, function (error) {
             console.log("Transaction failed");
             res.render('profile',{update: update,bal:bal,user_address: user_address,failure :'1'});
            throw new Error('The destination account does not exist!');

          })
          .then(function() {
            return server.loadAccount(sourceKeys.publicKey());
          })
          .then(function(sourceAccount) {
            // Start building the transaction.
            transaction = new StellarSdk.TransactionBuilder(sourceAccount)
              .addOperation(StellarSdk.Operation.payment({
                destination: destinationId,
                asset: StellarSdk.Asset.native(),
                amount: req.body.amount
              }))
              .addMemo(StellarSdk.Memo.text('Test Transaction'))
              .build();
            transaction.sign(sourceKeys);
            return server.submitTransaction(transaction);
          })
          .then(function(result) {
            console.log('Success! Results:', result);
          }).then(function(){server.loadAccount(user_address).then(function (account) {
                  account.balances.forEach(function (balance) {
                        console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
                        bal = balance.balance;
                        console.log(req.session.user+"your balance:"+ bal);
                        var update=req.session.user+" your balance:"+ bal;
                        console.log(update);
                        console.log(user_address);
                        res.render('profile',{update: update,bal:bal,user_address: user_address,success : '-1'});

                      });
                }).catch(function (err) {
                  console.error(err);
                });
          })
          .catch(function(error) {
            console.error('Something went wrong!', error);
              });         
          
  }
  })
});
app.get('/',(req,res,next)=>{
    console.log("Helo",req.session.user);
    var dbconnect=require('./mongodb_connect.js');
     user_seed = '';
     user_address = '';
     data3 = '';
     User.findOne({
         username:req.session.user
     },function(err,user){
         if(user){
             user_seed = user.seed;
             user_address = user.address;
             console.log(user_seed);
             StellarSdk.Network.useTestNetwork();
            var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
             var accountId = user_address;
             console.log("x:",accountId);
                    server.transactions()
                        .forAccount(accountId)
                        .call()
                        .then(function (page) {
                            console.log('Page 1: ');
                            console.log(page.records);
                            data3 = page.records;
                            return page.next();
                        })
                        .then(function (page1) {
                            console.log('Page 2: ');
                            console.log(page1.records);
                            res.render('profile',{data:data3,data1:page1.records});


                        })
                        .catch(function (err) {
                            console.log(err);
                        });
         }
     });

});
  module.exports=app;