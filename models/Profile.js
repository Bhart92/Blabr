const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    avatar: {
        type: String,
        required: false
    },
    company: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    location: {
      type: String
    },
    interests: {
      type: [String],
      required: true
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
              firstName: String,
              ref: 'user' 
          },
      }
  ],
    social: {
        youtube: {
        type: String
        },
        twitter: {
        type: String
        },
        facebook: {
        type: String
        },
        instagram: {
        type: String
        }
    },
    date: {
      type: Date,
      default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);