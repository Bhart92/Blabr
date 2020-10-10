const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String
    },
    fullName: {
        type: String,
    },
    image: {
        type: String
    },
    title: {
        type: String
    },
    url: {
        type: String
    },
    handle: {
        type: String
    },
    description: {
        type: String
    },
    avatar: {
        type: String
    },
    repostAvatar: {
        type: String
    },
    interests: {
        type: Array
    },
    followers: {
        type: Array
    },
    following: {
        type: Array
    },
    bio: {type: String},
    location: {type: String},
    company: {type: String},
    userTitle: {type: String},

    repostHandle: {
        type: String
    },
    repostfullName: {
        type: String
    },
    commentary: {
        type: String
    },
    originalCommentary: {
        String
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            avatar: {
                type: String
            },
            fullName:{
                type: String
            },
             handle: { 
                type: String
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Post = mongoose.model('post', PostSchema);