import  {Post} from "../models/post.model.js";
import {User} from "../models/user.model.js";

const createPost = async (req, res) => {
  const { caption, imageUrl,postedBy } = req.body;
  //const postedBy = req.user._id; // Assuming user ID is stored in req.user after authentication


  try {
    const newPost = new Post({
      caption,
      imageUrl,
      postedBy
    });

    await newPost.save();
    res.status(201).json({ success: true, post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

const getPosts = async (req, res) => {

  try {
    const posts = await Post.find()
      .populate('postedBy', 'username name') // Populate user details
      .populate('likes', 'username name') // Populate likes with user details
      .populate('comments.commentedBy', 'username name') // Populate comments with user details
      .sort({ createdAt: -1 }); // Sort by creation date, newest first
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

const likePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id; // Assuming user ID is stored in req.user after authentication

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    if (post.likes.includes(userId)) {
      // User already liked the post, so remove the like
      post.likes = post.likes.filter(id => id.toString() !== userId.toString());
    } else {
      // User has not liked the post, so add the like
      post.likes.push(userId);
    }
    await post.save();
    res.status(200).json({ success: true, post });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}


const commentOnPost = async (req, res) => {
  const postId = req.params.id;
  const { text } = req.body;
  const commentedBy = req.user._id; // Assuming user ID is stored in req.user after authentication

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    post.comments.push({
      text,
      commentedBy,
      createdAt: new Date()
    });

    await post.save();
    res.status(200).json({ success: true, post });
  } catch (error) {
    console.error("Error commenting on post:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}


// all posts for the all users
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('postedBy', 'username name') // Populate user details
      .populate('likes', 'username name') // Populate likes with user details
      .populate('comments.commentedBy', 'username name') // Populate comments with user details
      .sort({ createdAt: -1 }); // Sort by creation date, newest first
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export { createPost, getPosts, likePost, commentOnPost, getAllPosts };


