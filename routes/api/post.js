const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth-middleware');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

// @route  POST api/post
// @desc   Test Router
// @access Private
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
        res.status(500).send('Failed to publish post')
    }
});

//GET All post
//Will be in private mode
router.get('/', auth, async(req, res) => {
    try {
        const post = await Post.find().sort({Date: -1});
        res.json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Failed to see posts')
    }
})

//GET Single post
//Will be in private mode
router.get('/:postID', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.postID);
        if(!post){
            res.status(404).send({msg: 'Post not found!'});
        }
        res.json(post);
    } catch (error) {
        if(error.kind === 'ObjectId'){
            res.status(404).send({msg: 'Post not found!'});
        }
        console.error(error.message);
        res.status(500).send('Failed to see posts')
    }
})

//Delete post
//Will be in private mode
router.delete('/:postID', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.postID);
        if(post.user.toString() !== req.user.userId){
            res.status(401).send({msg: "Unauthorized to delete post!"})
        }
        if(!post){
            res.status(404).send({msg: 'Post not found!'});
        }
        await post.remove();
        res.json({msg: "Post deleted successfully!"});
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId'){
            res.status(404).send({msg: 'Post not found!'});
        }
        res.status(500).send('Failed to see posts')
    }
})

//Liking a post
//Private
router.put('/likes/:postID', auth, async(req, res) => {
    try {
        let post = await Post.findById(req.params.postID);
        if(post.likes.map(like => like.user.toString()).indexOf(req.user.userId) >= 0){
            res.status(500).send({msg: 'You already liked this post!'})
        } else {
            post.likes.unshift({user: req.user.userId});
            await post.save();
            res.json(post.likes);
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Post was already been liked')
    }
})

//Unliking a post
//Private
router.put('/unlike/:postID', auth, async(req, res) => {
    try {
        let post = await Post.findById(req.params.postID);
        if(post.likes.filter(like => like.user.toString() === req.user.userId).length = 0){
            res.status(500).send({msg: 'Post is not yet liked!'})
        }
        const removeIndex = post.likes.map(l => l.user.toString).indexOf(req.user.userId);

        post.likes.splice(removeIndex, 1);
        await post.save();
        res.json(post.likes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Failed to unlike a post or post unavailable')
    }
})

// @route  POST api/post/comment/:postID
// @desc   Comment on a pst
// @access Private
router.post('/comment/:postID', [
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
        const post = await Post.findById(req.params.postID);

        const newComment = {
            text: req.body.text,
            name: getProfile.name,
            avatar: getProfile.avatar,
            user: req.user.userId
        };
        post.comments.unshift(newComment)
        await post.save();
        res.json(post.comments)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Failed to post a comment')
    }
});


// @route  DELETE api/post/comment/:postID/:commentID
// @desc   Delete comment on a post
// @access Private
router.delete('/comment/:postID/:commentID', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.postID);
        const comments = post.comments.find(com => com.id.toString() === req.params.commentID);
        if(!comments){
            res.status(404).send('Comment does not exist!')
        }
        if(comments.user.toString() !== req.user.userId){
            res.status(401).send('Unauthorized to delete comments')
        } else {
            const comIndex = post.comments.map(com => com.id.toString()).indexOf(req.params.commentID)
            post.comments.splice(comIndex, 1);
            post.save();
            res.json(post.comments)
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Failed to delete a comment')
    }
})
module.exports = router;