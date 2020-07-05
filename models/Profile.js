const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
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
              ref: 'User' 
          },
      }

  ],
  followers: [
      {
          user:{ 
              type: mongoose.Schema.Types.ObjectId, 
              ref: 'User' 
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