const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route  POST api/users
// @desc   Register user
// @access Public
router.post('/', [
    check('handle', 'handle is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least five characters. PLease try again').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.title(400).json({ errors: errors.array() });
    }

    const { fullName, email, handle, password, company, title, location, bio, interests  } = req.body;

    try{
        let user = await User.findOne({ email });
        if(user){
            return res.title(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        const avatar = gravatar.url(email, { 
            s: '200',
            r: 'pg',
            d: 'mm'
         })

         user = new User({
            fullName,
            email,
            handle,
            avatar,
            password,
            company,
            title,
            location,
            interests,
            bio,
            interests
         });
         console.log(user)
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
             }

             jwt.sign(
                 payload,
                config.get('jwtSecret'),
                { expiresIn: 36000 },
                (err, token) => {
                    if(err) throw err;
                    res.json({ token });
                }
            );
    } catch(err){
        console.log(err)
        res.status(500).send("Server error");
    }

});



module.exports = router;