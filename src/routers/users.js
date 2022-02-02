const express=require('express');
const mongoose=require('mongoose');
const User=require('../models/users');
const bcrypt=require('bcryptjs');
const auth=require('../middleware/auth');
const { findByIdAndUpdate, findById } = require('../models/users');
const router=express.Router();
const multer=require('multer');


const formidable = require('formidable');
const {storage,uploadFunc,makeFolder}=require('./upload');
router.post('/login',async(req,res)=>{
    
    const email=req.body.email;
    const password=req.body.password;
    
    try {
        const user=await User.getUserByCredentials(email,password);
        const token=await user.generateAuthToken();
        response={
            status:true,
            message:'User logged in successfully',
            user:user,
            token:token
        }
        res.send(response);
    } catch (error) {
        response={
            message:error.message,
            status:false
        }
        res.status(400).send(response)
    }
});



router.post('/',[auth],async(req,res)=>{
    const upload=uploadFunc('profile_pic');
    upload(req, res, async function(err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        if (err) {
            return res.send(err.message);
        }
        const name=req.body.name;
        const password=req.body.password;
        const hashedPassword=await bcrypt.hash(password,8);
        if(req.file===undefined){
            imagePath='';
        }else{
            imagePath='userimage/'+req.file.filename;
        }
        const user=new User({
            name:name,
            email:req.body.email,
            phone:req.body.phone,
            password:hashedPassword,
            image:imagePath
        });
        try {
            await user.save();
            const token=await user.generateAuthToken();
            res.status(200).send({user,token})
            
        } catch (error) {
            res.status(400).send(error.message)
        }    
    })   
});
router.put('/:id',[auth],async(req,res)=>{
    const upload=uploadFunc('profile_pic');
   upload(req, res, async function(err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        if (err) {
            return res.send(err.message);
        }
        const _id=req.params.id;
        const name=req.body.name;
        const password=req.body.password;
        const email=req.body.email;
        const user=await User.findById(_id);
        
        if(!user){
            throw new Error('Unable to update the user')
        }
        user.name=name;
        user.email=email;
        if(req.file!==undefined){
           user.image='userimage/'+req.file.filename;
        }
        try {
            await user.save();
            res.status(200).send({user})
        } catch (error) {
            res.status(400).send(error.message)
        }
    });
    
});
router.get('/',[auth],async(req,res)=>{
    const user= req.user;
    res.send(user);
});
const upload = multer({ dest: 'uploads/' })

const cpUpload = upload.fields('education'['certificate', 1]);

router.post('/updateProfile',[auth,upload.none()],async(req,res)=>{
    try {
        const _id=req.user._id;
        
        
        
        const user=await User.findById(_id);
        user.name=req.body.name;
        user.email=req.body.email;
        user.phone=req.body.phone;
        user.skills=req.body.skills;
        user.address=req.body.address;
        user.education=req.body.education;
        
        if(!user){
            throw new Error('Unable to update the user')
        }
        if(req.file!==undefined){
           user.image='userimage/'+req.file.filename;
        }
        await user.save();
        res.status(200).send({user})
        
    }catch(err){
        res.status(400).send(err);
    }
    
    // req.files.forEach(function(item){

    //     //console.log(req.body)
    //     //res.send(item);
    //     // what should i do here 
    // })
    
    // const form = formidable({ multiples: true });
    // form.parse(req, (err, fields, files) => {
    //     if (err) {
    //       next(err);
    //       return;
    //     }
    //     console.log(Object.keys(files))
    //     res.send({ fields, files });
    //   });
    //console.log(req.files)
    // upload_cert(req, res, async function(err) {
    //     console.log(req.education)
    //     // if (req.fileValidationError) {
    //     //     return res.send(req.fileValidationError);
    //     // }
    //     // if (err) {
    //     //     return res.send(err.message);
    //     // }
    //     // const _id=req.params.id;
    //     // const name=req.body.name;
    //     // const password=req.body.password;
    //     // const email=req.body.email;
    //     // const user=await User.findById(_id);
        
    //     // if(!user){
    //     //     throw new Error('Unable to update the user')
    //     // }
    //     // user.name=name;
    //     // user.email=email;
    //     // if(req.file!==undefined){
    //     //    user.image='userimage/'+req.file.filename;
    //     // }
    //     // try {
    //     //     await user.save();
    //     //     res.status(200).send({user})
    //     // } catch (error) {
    //     //     res.status(400).send(error.message)
    //     // }
    // });
    
    // const user= req.user;
    // user.name=req.body.name;
    // user.email=req.body.email;
    // user.phone=req.body.phone;
    // user.education=req.body.education;
    // user.skills=req.body.skills;
    // user.address=req.body.address;
    // try {
    //     await user.save();
    //     res.status(200).send(user);
        
    // } catch (error) {
    //     res.status(400).send(error.message)
    // }    
});

module.exports=router;