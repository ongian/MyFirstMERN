const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth-middleware');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

// @route  GET api/post
// @desc   Test Router
// @access Public
router.post('/', [
    auth,
    [
        check('text', 'Text is required').not().isEmpty()
    ]
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
    }
    try {
        const getProfile = await User.findById(req.user.userId).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: getProfile.name,
            avatar: getProfile.avatar,
            user: req.user.userId
        })

        const post = await newPost.save();
        res.json(post)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Failed to post comment')
    }
});

module.exports = router;