import mongoose from "mongoose"

const dbconntion = async()=>{
 try{
   mongoose.connect(process.env.DB_URL);
   console.log("mongoose connected sucessfully");
 }catch(error){
  console.log("mongoose connection error");
    console.log(error);
 }
}

export {dbconntion}
