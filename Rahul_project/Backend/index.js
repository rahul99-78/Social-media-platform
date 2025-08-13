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

// import the routes
import { router  } from "./router/user.router.js";
// use the routes
App.use("/api/user", router);
// default router
App.get("/", (req, res) => {
  res.send("Welcome to the backend server");
});

App.listen(port,()=>{
  console.log("App is listin at the port ",port);
})
