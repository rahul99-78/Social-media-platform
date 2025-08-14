import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,  // converts to lowercase before saving
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  isVerified: {
    type: Boolean,
    default: false
   },
}, {
  timestamps: true  // automatically adds createdAt and updatedAt fields
});

// hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);  // returns true or false
};

// generate JWT token
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;  // returns the generated token
};


const User = mongoose.model('User', userSchema);
export { User };

