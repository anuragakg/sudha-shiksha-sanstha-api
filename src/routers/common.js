const express=require('express');
const router=new express.Router();
const {sendEMail}=require('../../email');
const response=require('../../response')
router.post('/send-contact-mail',async(req,res)=>{
   const name=req.body.name;
   const phone=req.body.phone;
   const message=`${name} trying to contact you .${phone}`;
   
   const mail=await sendEMail('anuragkrgupta14@gmail.com','Contact SSS',message);
    
    if(mail){
        response.success('Your message sent successfully',res)
        
    }else{
        response.error('Your message sent successfully',res) 
    }
});
module.exports=router;
