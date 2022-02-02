const express=require('express');
const mongoose=require('mongoose');
const Category = require('../models/category');
const auth=require('../middleware/auth');
const router=express.Router();
const Page=require('../models/page');

router.post('/addCategory',[auth],async(req,res)=>{
    const title=req.body.title;
    const alias = title.replace(/\s+/g, '-').toLowerCase();
    const data={
        title:req.body.title,
        alias:alias,
        status:true,
        addedBy:req.user._id
    };
    
    const category=new Category(data);

    try{
        await category.save();
        res.status(200).send({category})
    }catch(error){
        res.status(400).send(error.message)
    }
});
router.get('/categories',[auth],async(req,res)=>{
    const category=await Category.find().populate('page_ids','title alias').select("title alias status page_ids");
    
    res.status(200).send(category);
});
router.post('/add-page',[auth],async(req,res)=>{
    const title=req.body.title;
    const alias = title.replace(/\s+/g, '-').toLowerCase();
    const data={
        title:title,
        alias:alias,
        content:req.body.content,
        status:true
    }
    const page=new Page(data);
    try{
        await page.save()
        res.status(200).send(page);
    }catch(error){
        res.status(400).send(error.message)
    }
});
router.get('/get-pages',[auth],async(req,res)=>{
    const page=await Page.find();
    res.status(200).send(page);
});
router.get('/get-page-data',[auth],async(req,res)=>{
    const alias=req.query.alias;
    const page=await Page.findOne({alias:alias});
    res.status(200).send(page);
});
router.post('/category-page-sync',[auth],async(req,res)=>{
    const cat_id=req.body.category_id;
    const page_ids=req.body.page_ids;
    let data=[];
    page_ids.forEach(row => {
        data.push(row);
    });
    // const data={
    //     req.body.page_ids,
    // }
    
    try{
        const category=await Category.findById(cat_id);
        category.page_ids=page_ids;
        category.save();
        res.status(200).send(category);
    }catch(error){
        res.status(400).send(error.message)
    }
});
module.exports=router;