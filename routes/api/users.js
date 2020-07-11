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
    check('firstName', 'First Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('handle', 'handle is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least five characters. PLease try again').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, handle, password } = req.body;

    try{
        let user = await User.findOne({ email });
        if(user){
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        const avatar = gravatar.url(email, { 
            s: '200',
            r: 'pg',
            d: 'mm'
         })

         user = new User({
            firstName,
            lastName,
             email,
             handle,
             avatar,
             password
         });

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
        console.error(err.message);
        res.status(500).send("Server error");
    }

});



module.exports = router;