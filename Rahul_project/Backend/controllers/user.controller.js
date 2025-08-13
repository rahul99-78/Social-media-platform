import { User } from "../models/user.model.js";

const Signup = async (req, res) => {
  try {
    const { name, username, password, email } = req.body;

    // 1. Validate required fields
    if (!name || !username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2. Check if user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered",
      });
    }

    // 3. Check if username is already taken
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "Username is already taken",
      });
    }

    // 4. Create new user (password will be hashed automatically by pre-save hook)
    const newUser = new User({
      name,
      username,
      password, // Do NOT hash manually here since pre('save') already does it
      email,
    });

    await newUser.save();

    // 5. Respond with success
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Signup controller error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { Signup };

