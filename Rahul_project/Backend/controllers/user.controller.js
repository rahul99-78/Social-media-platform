import {User} from "../models/user.model.js";


const Signup = async (req, res) => {
  try {
    const {name,email,password,username} = req.body;
    // Validate input
    if (!name || !email || !password || !username) {  // Check if all fields are provided
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check if user already exists

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    //username check
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: 'Username already taken'
      });
    }
    // Create new user
    const user = new User({ name, email, password: password, username });
    await user.save();
    // Respond with success message
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username
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
