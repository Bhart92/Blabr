const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');


// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route  POST api/profile
// @desc   Create or update profile
// @access Private
router.post('/', [auth, [
  check('status', 'Status is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
  }

const {
    company,
    status,
    location,
    interests,
    bio,
    youtube,
    twitter,
    facebook,
    instagram } = req.body;

    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(interests){
        profileFields.interests = interests.split(',').map(interest => interest.trim());
        }

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;

        try{
            let profile = await Profile.findOne({ user: req.user.id });
            if(profile){
                //Update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                    );
                return res.json(profile);
            }

            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);
        } catch(err){
            console.error(err.message);
                res.status(500).send('Server Error');
        }
    }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
    try {
      const profiles = await Profile.find().populate('user', ['name', 'avatar']);
      res.json(profiles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['firstName', 'lastName', 'handle', 'avatar', 'followers', 'following']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});
// @route  POST api/users/follow-user
// @desc   follow a  user
// @access Private
router.post('/user/:user_id/follow-user', auth, async (req, res) => {
  try {
    // Request visited users data
      const visitiedProfile = await Profile.findOne({
        user: req.params.user_id
      }).populate( 
      'followers',
      'user',
      ['name', 'avatar']
      );

      // Check to make sure current user isnt already following visited user
      if(visitiedProfile.followers.filter(follower => 
          follower.user.toString() === req.user.id ).length > 0){
            return res.status(400).end('User already followed')
          }
      // Checks to see if user is attempting to follow themselves
      if (req.user.id === req.params.user_id) {
            return res.status(400).end('You cannot follow yourself')
        } 
      // Add current user to visited users follwer array
      visitiedProfile.followers.unshift({user:req.user.id});

      // save visited user
      await visitiedProfile.save()

      // Get current users profile
      const currentProfile =  await Profile.findOne({ user: req.user.id }).populate(
        'followers',
        'user',
        ['handle', 'avatar']
      );
      const userObjects = {
        visitiedProfile,
        currentProfile
      };

      // Add visited user to current users following array
      currentProfile.following.unshift({user: req.params.user_id});

      // save current user
      await currentProfile.save();

      // send objects
      res.json(userObjects)

  } catch (err) {
      res.status(500).end('User already followed')
  }
})

// @route    DELETE api/profile
// @desc     delete profile, user & posts
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    //todo remove users posts
    await Post.deleteMany({ user: req.user.id });
    //remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //remove user
    await User.findOneAndRemove({ _id: req.user.id });

      res.json({ msg: 'User Deleted' });
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



module.exports = router;