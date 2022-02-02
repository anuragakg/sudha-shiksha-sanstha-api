const mongoose =require('mongoose');

const categorySchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true
    },
    alias:{
        type:String,
        trim:true,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    },
    page_ids:[
        {    type:mongoose.Schema.Types.ObjectId,
            ref:"Pages"}
        
    ],
    addedBy:{
        type:String,
        required:true,
    }
},
{
    timestamps: true,
});

const category=mongoose.model('Category',categorySchema);
module.exports=category;