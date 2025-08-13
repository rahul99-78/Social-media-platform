import { Router } from "express";

const router = Router();
import { signup } from "../controllers/user.controller.js";


// User signup route
router.post("/signup", signup);
// Add more user-related routes here in the future

export {router}
