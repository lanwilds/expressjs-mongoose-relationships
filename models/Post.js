const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title:{type:String,require:true},
    description:{type:String,require:true},
    category:{type:String,require:true},
    author:{
        type:Schema.Types.ObjectId, 
        ref: 'authors',
        require:true
    },
    body:{type:String,require:true}
});


module.exports = Post = mongoose.model('posts',postSchema);