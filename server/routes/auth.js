const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const User=mongoose.model("user");
const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken');
const{JWT_SECRET}=require("../Keys")
const requireLogin=require('../middleware/requireLogin');





router.post('/signup',(req,res)=>{
    
    const {name,email,password}=req.body
    console.log(req.body);
    if(!email ||!name ||!password)
    {  
        return res.status(422).json({error:"please add all the details"})
       
    }
    User.findOne({email:email}).then((savedUser)=>{
        if(savedUser){
    
           return  res.status(422).json({error:"user already exists with that email"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user= new User({
                email,
                password:hashedpassword,
                name
             })
         user.save() 
        .then(u=>{
            res.json({message:"saved successfully"})
        }).catch(err=>{
            console.log(err);
        })
    }).catch(err=>{
        console.log(err)
    })
        })
            
})

router.post('/signin',(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
       return res.json({error:"please add email or password"})
    }
    User.findOne({email})
    .then(saved=>{
        if(!saved)
        {
           return res.json({error:"Invalid email or password"})
        }
        bcrypt.compare(password,saved.password)
        .then(match=>{
            if(match){

                const token=jwt.sign({_id:saved._id},JWT_SECRET)
                const {_id,name,email}=saved
                res.json({token,user:{_id,name,email}})
            }
            else{
                return res.json({error:"invalid email or password"})
            }
        }).catch(err=>{
            console.log(err)
        })
    })
})
module.exports=router;

