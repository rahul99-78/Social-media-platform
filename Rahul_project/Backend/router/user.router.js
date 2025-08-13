import { Router } from "express";

const router = Router();
import {Signup} from "../controllers/user.controller.js";


// User signup route
router.post("/signup", Signup);
// Add more user-related routes here in the future

export {router}
