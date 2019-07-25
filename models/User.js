const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    address:{type:String,require:true},
    age:{type:Number}
});


module.exports = User = mongoose.model('users',userSchema);