var mongoose=require('mongoose');
var schema=new mongoose.Schema({
  username:{type:String,required:true,unique:true},
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true,unique:true},
  address:{type:String,required:true,unique:true},
  seed:{type:String,required:true,unique:true},
  isVerified: { type: Boolean, default: false },
  admin:Boolean
});
var User=mongoose.model('User',schema);
module.exports=User;
