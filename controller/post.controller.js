const Post = require("../model/post.model");

async function upload(UserId,name,description, image, likes, comments){
  //  console.log(UserId,name)
      let obj = {
        userId: UserId,
        name:name,
        description : description,
        image: image,
        likes:likes,
        comments:comments
      }

      let post = Post.create(obj);

      return post;
}

async function fetchPosts(){
  
    let posts = await Post.find();
    // console.log(posts);
    return posts;
}

async function findParticular(id,userId){
  let post = await Post.findOne({_id:id});
    console.log(post)
  if(post.likes.includes(userId)){
    post = await Post.updateOne({_id:id},{$pull:{likes:userId}});
  }

  else{
    post = await Post.updateOne({_id:id},{$push:{likes:userId}});
  }
  
  return post;
}


async function deleteParticular(id){
  let data = await Post.deleteOne({_id:id});
  return data;
}

async function addComment(id, userId,name, comment){
  let obj = {userId,comment,name}
  console.log(obj)
  let post = await Post.updateOne({_id:id},{$push:{comments:obj}});
  console.log(post)
  
  return post;
}

async function deleteComment(id, comment){
  let post = await Post.updateOne({_id:id},{$pull:{comments:{comment:comment}}});
  console.log(post)
  return post;
}

module.exports={upload,fetchPosts, findParticular, deleteParticular, addComment, deleteComment};