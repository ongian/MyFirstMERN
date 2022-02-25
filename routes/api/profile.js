const express = require('express');
const router = express.Router();
const user = require('../../models/User');
const profile = require('../../models/Profile');
const auth = require('../../middleware/auth-middleware');
const mongoose = require('mongoose');
const axios = require('axios');
const config = require('config');
const normalize = require('normalize-url');
const {check, validationResult} = require('express-validator');
const Post = require('../../models/Profile');
const checkObjectID = require('../../middleware/checkObjectID');

// @route  GET api/profile/me
// @desc   Display own profile
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const userProfile = await profile.findOne({user: req.user.userId}).populate('user', [
            'name',
            'avatar'
        ]);
        if(!userProfile){
           return res.status(400).json({msg: 'No profile found for the current user!'})
        }
        res.json(userProfile)
    } catch(error){
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
});

// @route  POST api/profile
// @desc   Create or update Profiles
// @access Private
router.post('/', [
    auth, [
        check('status', 'Status is required').notEmpty(),
        check('skills', 'Skills is required').notEmpty()
    ],
    async(req, res) => {
        const profilePostError = validationResult(req);
        if(!profilePostError.isEmpty()){
            return res.status(400).json({errors: profilePostError.array()})
        }
        
        const {
            website,
            skills,
            youtube,
            twitter,
            instagram,
            linkedin,
            facebook,
            // spread the rest of the fields we don't need to check
            ...rest
        } = req.body;

        const profileFields = {
            user: req.user.userId,
            website: website && website !== ''
            ? normalize(website, { forceHttps: true })
            : '',
            skills: Array.isArray(skills)
            ? skills
            : skills.split(',').map((skill) => ' ' + skill.trim()),
          ...rest
        };
        const socialMedia = { youtube, twitter, instagram, linkedin, facebook };

        try{
            let getProfile = await profile.findOne({user: req.user.userId});
            if(getProfile){
                getProfile = await profile.findOneAndUpdate(
                    {user: req.user.userId}, 
                    {$set: profileFields},
                    {new: true}
                )
                return res.json(getProfile);
            }
            
            getProfile = new profile(profileFields);
            await getProfile.save();

            return res.json(getProfile)
        }catch(error){
            console.error('Profile not saved');
            res.status(500).send('Profile not saved')
        }
       
    }
])

//Get the profiles
router.get('/', async(req, res) => {
    try {
        const myProfile = await profile.find().populate('user', ['name', 'avatar']);
        res.json(myProfile)
    } catch (error) {   
        console.error(error.message);
        res.status(500).send('Failed to get profile info!')
    }
})


//Get the profiles by UserID

router.get('/user/:userId', checkObjectID('userId'), async(req, res) => {
    
    //check if userId object is available and valid objectID in mongoDB
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)){
        return res.status(400).json({ msg: 'Invalid user ID' });
    }

    try {
        const myProfile = await profile.findOne({
            user: req.params.userId
        }).populate('user', ['name', 'avatar']);
        
        
        if(!myProfile){
            return res.status(400).json({msg: "No profile for this user!"})
        }
        res.json(myProfile)
    } catch (error) {   
        console.error(error.message);
        res.status(500).send('Failed to get profile info!')
    }
})

//Delete user's profile
router.delete('/', auth, async(req, res) => {
    try {
        //remove post of user
        Post.deleteMany({user: req.user.userId})
        //remove profile
        await profile.findOneAndRemove({user: req.user.userId});
        //remove user
        await user.findOneAndRemove({_id: req.user.userId});
        res.json({msg: 'User is removed!'});
    } catch (error) {   
        console.error(error.message);
        res.status(500).send('Failed to get profile info!')
    }
})


//Put experience to profile
//route will be /api/profile/experience

router.put('/experience', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
    }

    const {title, company, location, from, to, current, description} = req.body;
    const newExp = {title, company, location, from, to, current, description};
    try {
        const getProfile = await profile.findOne({user: req.user.userId});
        getProfile.experience.unshift(newExp);
        await getProfile.save();
        res.json(getProfile)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
})


//Delete experience to profile
//route will be /api/profile/experience:expID
router.delete('/experience/:expID', auth, async(req, res) => {
    try {
        const getProfile = await profile.findOne({user: req.user.userId});
        const removeExpIndex = getProfile.experience.map(exp => exp.id).indexOf(req.params.expID);
        getProfile.experience.splice(removeExpIndex, 1);
        await getProfile.save();
        res.json(getProfile)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
})

//Put Education to profile
//route will be /api/profile/education

router.put('/education', [auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
    }

    const {school, degree, fieldofstudy, from, to, current, description} = req.body;
    const education = {school, degree, fieldofstudy, from, to, current, description};
    try {
        const getProfile = await profile.findOne({user: req.user.userId});
        getProfile.education.unshift(education);
        await getProfile.save();
        res.json(getProfile)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
})


//Delete Education to profile
//route will be /api/profile/education:educID
router.delete('/education/:educID', auth, async(req, res) => {
    try {
        const getProfile = await profile.findOne({user: req.user.userId});
        const removeExpIndex = getProfile.education.map(exp => exp.id).indexOf(req.params.expID);
        getProfile.education.splice(removeExpIndex, 1);
        await getProfile.save();
        res.json(getProfile)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
});

//GET GITHUB PROFILE
//Route will be api/profile/github/:username
router.get('/github/:username', async(req, res) => {
    try {
        const uri = encodeURI(
          `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
        );
        const headers = {
          'user-agent': 'node.js',
          Authorization: `token ${config.get('personalAccessToken')}`
        };
    
        const gitHubResponse = await axios.get(uri, { headers });
        return res.json(gitHubResponse.data);
    } catch (err) {
        console.error(err.message);
        return res.status(404).json({ msg: 'No Github profile found' });
    }
})

module.exports = router;