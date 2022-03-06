const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const {check, validationResult} = require('express-validator');

const gravatar = require('gravatar');

const bcrypt = require('bcryptjs');

const User = require('../../models/User');

// @route  POST api/users
// @desc   Post request to database
// @access Public
router.post('/',[
    check('name', 'name is required').not().isEmpty(),
    check('email', 'please enter a valid email').isEmail(),
    check('password', 'please enter a valid password, minimum of 6 digits').isLength({min: 6})
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {name, email, password} = req.body;
    try {

        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({error: [{msg: 'Email already exist!'}]})
        }
        
        const avatar = gravatar.url(email, {
            s: '150',
            r: 'pg',
            d: 'mm'
        })
        
        user = new User({
            name,
            email,
            password,
            avatar
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save()
        const payload = {
            user: {
                //it's the _id in mongoDB but with mongoose it can be just id because of abstraction
                userId: user.id
            }
        }
        jwt.sign(
            payload, 
            process.env.jwtSecret,
            {expiresIn: 3600},
            (err, token) => {
                if (err) throw err;
                res.json({token})
            }
        )
    }catch(err){
        console.log(err.message)
        res.status(500).send('Server Error')
    }
});

module.exports = router;