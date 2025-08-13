import express from "express"
import dotenv from "dotenv";
import { dbconntion } from "./db/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";


const App = express();

const port = 8080;
// middleware
App.use(express.json());
App.use(cors());

// config the dotenv
dotenv.config({
  path:'.env'
})

// db connection
dbconntion();
// cookie parser
App.use(cookieParser());


App.listen(port,()=>{
  console.log("App is listin at the port ",port);
})
