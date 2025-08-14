import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
   type: {
    type: String,
    enum: ['text', 'image', 'video'],
    required: true
  },
  caption: {
    type: String,
    trim: true,
    maxLength: 2200, // Instagram caption limit
  },
  imageUrl: {
    type: String,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  comments: [
    {
      text: { type: String },
      commentedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, {
  timestamps: true // adds createdAt and updatedAt
});

const Post = mongoose.model('Post', postSchema);

export {Post} ;
