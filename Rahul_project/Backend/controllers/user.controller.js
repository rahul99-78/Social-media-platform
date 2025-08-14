import {User} from "../models/user.model.js";


const Signup = async (req, res) => {
  try {
    const user = req.body;
    // Check if user already exists
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        name: user.name
      }
    });
    console.log('User created:', user);
  } catch (error) {
    res.status(400).json({
      message: 'Error creating user',
      error: error.message
    });
  }
}


export { Signup };
