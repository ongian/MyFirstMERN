const express = require('express');
const router = express.Router();

// @route  GET api/post
// @desc   Test Router
// @access Public
router.get('/', (req, res) => res.send('Post Router'));

module.exports = router;