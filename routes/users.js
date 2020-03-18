// routes/users.js

const express = require('express'),
secured = require('../lib/middleware/secured'),
router = express.Router({mergeParams: true});

/* GET user profile. */
router.get('/user', secured(), function (req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  res.render('user', {
    userProfile: JSON.stringify(userProfile, null, 2),
    title: 'Profile page'
  });
});

module.exports = router;