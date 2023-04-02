const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId:{
        type:String
    },

    name:{
        type:String
    },

    description :{
        type:String
    },

    image:{
        type:String
    },

    likes:[],

    comments:[]
})

const Post = mongoose.model("Post", postSchema);

module.exports=Post;