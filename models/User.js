const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        requried: true
    },
    email: { 
        type: String,
        required: true,
        unique: true
    },
    handle: { 
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    company: {
        type: String
    },
    title: {
        type: String
    },
    location: {
      type: String
    },
    interests: {
      type: [String]
    },
    bio: {
      type: String
    },
    following: [
      {
          user:{ 
              type: mongoose.Schema.Types.ObjectId, 
              ref: 'user'
          },
      }
  ],
  followers: [
      {
          user:{ 
              type: mongoose.Schema.Types.ObjectId, 
              firstfullName: String,
              ref: 'user'
          },
      }
  ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);