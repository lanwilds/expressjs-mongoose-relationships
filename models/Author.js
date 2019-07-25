const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name:{type:String,require:true},
    posts:[{
        type:Schema.Types.ObjectId, 
        ref: 'posts',
        require:true
    }],
    ebooks:[{
        type:Schema.Types.ObjectId, 
        ref: 'ebooks',
        require:true
    }],
    email:{type:String,unique:true,require:true}
});


module.exports = Author = mongoose.model('authors',authorSchema);