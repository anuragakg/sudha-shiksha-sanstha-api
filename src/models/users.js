const mongoose =require('mongoose');
var validator = require('validator');
const email = require('../../email');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const { text } = require('body-parser');
const userSchema=mongoose.Schema({
    name:{
        type:String,
        trim:true,
        minlength:2,
        maxlength:50,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
    },
    phone:{
        type:String,
        trim:true,
        required:true,
    },
    password:{
        type:String,
        trim:true,
        required:true,
        minlength:6,
        validate(value){
            if(value.toString().toLowerCase().includes('password')){
                throw new Error('Enter secure password')
            }
        }
    },
    tokens:[{
        token:{
            required:true,
            type:String
        }
    }],
    image:{
        type:String
    },
    skills:{
        type:String
    },
    education:[{
        title:{
            type:String
        }
    }],
    address:{
        type:String,
        trim:true
    },
},
{timestamps:true}

);
userSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email); 
 }, 'Please enter a valid email address');
userSchema.statics.getUserByCredentials=async (email,password)=>{
    const user=await User.findOne({email});
    
    if(!user){
        throw new Error('User not found')
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error('unable to login')
    }
    return user;
}
userSchema.methods.generateAuthToken=async function(){
    const user=this;
    const token=jwt.sign({_id:user._id.toString()},process.env.SECRET_KEY);
    user.tokens=user.tokens.concat({token:token})
    user.save();
    return token;
}
userSchema.methods.toJSON= function(){
    const user=this;
    const userObject=user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}
const User=mongoose.model('Users',userSchema);

module.exports=User;