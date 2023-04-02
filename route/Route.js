const express = require('express');
const { verify } = require('jsonwebtoken');
const {upload,fetchPosts,findParticular,deleteParticular,addComment,deleteComment} = require('../controller/post.controller');
const {register, login, Verify,getUser} = require('../controller/user.controller');
const Post = require('../model/post.model');
const api = express.Router();
const translate = require("translate-google")

api.post("/translate", async(req,res)=>{
   try {
    let {input, fromLang, toLang}=req.body;
    let output = await  translate(input, {from: fromLang, to: toLang});
    console.log(output);
    res.send(output);
   } catch (error) {
    console.log(error)
    res.send(error);
   }
})

api.post("/register", async(req,res)=>{
    try {
        let {name, email, gender, password}= req.body;
        let user = await register(name, email, gender, password);
        console.log(user);
        res.send({
            message: "User Registered Successful",
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error:"User went worng"
        })
    }
})

api.get("/getUser", async (req,res)=>{
    try {
       let {id} = req.body;
       console.log(id)
       let user = await getUser(id);
       console.log(user);
       res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

api.post("/login", async(req,res)=>{
    try {
        let {email, password}= req.body;
        let user = await login(email,password);
        console.log(user);
        res.send({
            message:"Login successfull",
            user
        })
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            error:error
        })
    }
})


api.post("/verify" , async(req,res)=>{
    try {
        let {token}= req.body;
        let user = await Verify(token);
        console.log(user);
        res.send({
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error:error 
        })
    }
})

api.post("/posts", async(req,res)=>{
    try {
        let { UserId,name,description, image, likes, comments}= req.body;
        // console.log(UserId,name,description, image, likes, comments )
        let post = await upload(UserId,name,description, image, likes, comments);
        console.log(post);
        res.send({
            message: "Post Uploaded Successfully",
            post,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ 
            error:"User went worng"
        })
    }
})

api.get("/posts", async(req,res)=>{
    try {
        let posts = await fetchPosts();
        res.send({
            message:"Posts are here",
            posts,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error:error
        })
    }
})

api.patch("/posts/:id", async (req,res)=>{
    try {
        let {id}= req.params;
        let {userId}=req.body;
       
        let post = await findParticular(id ,userId);
       
        res.send({
            message : "Here is your Post !",
            post : post
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error
        })
    }
})

api.delete("/posts/delete/:id", async (req,res)=>{
    try {
        let {id}= req.params;
        console.log(id);
        let post = await deleteParticular(id);
       
        res.send({
            message : "Post Deleted !",
            post : post
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error
        })
    }
})

api.post("/posts/comment/:id", async (req,res)=>{
    try {
        let {id}= req.params;
        let {userId,comment,name}= req.body;
        console.log(id);
        let post = await addComment(id,userId,name,comment);
       
        res.send({
            message : "Comment added successfully",
            post : post
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error
        })
    }
})

api.patch("/posts/comment/:id", async (req,res)=>{
    try {
        let {id}= req.params;
        let {comment}= req.body;
        let post = await deleteComment(id,comment);
       
        res.send({
            message : "Comment deleted successfully",
            post : post
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error
        })
    }
})




module.exports=api;
