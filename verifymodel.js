var mongoose=require('mongoose');
var schema = new mongoose.Schema({
    _userId: { type:String, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});
var Token=mongoose.model('Token',schema);
module.exports=Token;
