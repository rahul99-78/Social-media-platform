import {User} from "../models/user.model.js";
import { sendVerificationEmail } from '../utils/emailSErvice.js'; // Ensure this is imported
import { response } from "../utils/response.js";



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



const SignupWithVerification = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    if (!name || !email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: 'Username already taken'
      });
    }

    const user = new User({ name, email, password, username });
    await user.save();

    const token = user.generateAuthToken();

    await sendVerificationEmail(user, token);

    res.status(201).json({
      success: true,
      message: 'User created successfully. Verification email sent.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username
        // token: token // optional – comment this out if not needed in frontend
      }
    });

  } catch (error) {
    console.error('[Signup Error]', error.message);
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
};


const Singin = async (req,res)=>{
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return response(res, 400, false, 'Email and password are required');
    }
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return response(res, 404, false, 'User not found');
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return response(res, 401, false, 'Invalid password');
    }

    // Generate JWT token
    const token = user.generateAuthToken();

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        token: token // Include token in response
      },
      token
    });

  } catch (error) {
    console.error('[Signin Error]', error.message);
    response(res, 500, false, 'Error signing in', {
      error: error.message
    });
  }
}


export { Signup ,SignupWithVerification , Singin };
