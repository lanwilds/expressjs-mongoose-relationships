const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ebookSchema = new Schema({
    title:{type:String,require:true},
    category:{type:String,require:true},
    source:{type:String,require:true},
    author:[{
        type:Schema.Types.ObjectId, 
        ref: 'authors',
        require:true
    }]
});


module.exports = Ebook = mongoose.model('ebooks',ebookSchema);