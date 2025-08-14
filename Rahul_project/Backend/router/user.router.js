import { Router } from "express";

const router = Router();
import {Signup} from "../controllers/user.controller.js";
import { SignupWithVerification } from "../controllers/user.controller.js";
import { Singin } from "../controllers/user.controller.js";



// User signup route
router.post("/signup", Signup);

// User signup with email verification route
router.post("/signup-with-verification", SignupWithVerification);
// User signin route
router.post("/singin", Singin);
// Add more user-related routes here in the future






// post routes
import { createPost, getPosts, likePost } from "../controllers/post.controller.js";
// Create a new post
router.post("/post", createPost);

export {router}
