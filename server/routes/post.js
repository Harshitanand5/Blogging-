const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const requireLogin=require('../middleware/requireLogin');
const Post=mongoose.model("post");

router.get('/allpost',requireLogin,(req,res)=>{
    Post.find()
    .populate('postedBy','name _id')
    .then(posts=>{
        res.json({posts})
    }).catch(err=>{
        console.log(err)
    })
    
})


router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body}=req.body;
    console.log(title)
    console.log(body)
    if(!title||!body){
        return res.status(422).json({error:"please add all field"})
    }
    const post= new Post({
        title,
        body,
        postedBy:req.user
    })
    post.save()
    .then(result=>{
        res.json({post:result})
    }).catch(err=>{
        console.log(err)
    })
})

router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate('postedBy','name _id')
    .then(mypost=>{
        res.json({mypost})
    }).catch(err=>{
        console.log(err)
    })
})
module.exports=router;