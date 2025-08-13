import { User } from "../models/user.model.js";


const Signup = async(req,res)=>{
  try{
    // Validate request body
    const {name,username,passowrd,email} = req.body;

    // Check if all fields are provided
    if(!name || !username || !passowrd || !email){
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    // Check if username is valid
    const existingUser = await User.find({email: email });

    if(existingUser.length > 0){
      return res.status(400).json({
        message: "User already exists",
      });
    }
    // existing user password hash check
    const existingUsername = await User.find({username: username });

    if(existingUsername.length > 0){
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(passowrd, 10);
    // Create new user
    const newUser = new User({
      name,
      username,
      passowrd:hashedPassword, // Note: Consider hashing the password before saving
      email
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email
      }
    });


  }catch(error){
      console.log("Signup conntoller error ");
      res.status(500).json({
        success: false,
        message: "Internal server error",
      })
}
}
