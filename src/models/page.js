const mongoose=require('mongoose');

const pageSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    alias:{
        type:String,
        trim:true,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        
    }
},{
    timestamp:true
});
const page=mongoose.model('Pages',pageSchema);
module.exports=page;