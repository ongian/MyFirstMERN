const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth-middleware');
const User = require('../../models/User');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @route  GET api/auth
// @desc   Test Router
// @access Public
router.get('/', auth, async(req, res) => {
    try{
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user)
    }catch(error){
        console.error(error.message);
        res.status(500).send('Server Error')
    }
});

router.post('/',[
    check('email', 'please enter a valid email').isEmail(),
    check('password', 'Password is required!').exists()
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {email, password} = req.body;
    try {

        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({errors: [{msg: 'Invalid Credentials!'}]})
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({errors: [{msg: 'Invalid Credentials!'}]})
        }
        const payload = {
            user: {
                //it's the _id in mongoDB but with mongoose it can be just id because of abstraction
                userId: user.id
            }
        }


        jwt.sign(
            payload, 
            process.env.jwtSecret,
            {expiresIn: '5 days'},
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