const express = require('express');
const {auth}= require('../middleware/auth');
const {
    postUser,
    allProfiles,
    loginUser,
    myProfile,
    addReview,
    myReview
} = require('../controller/user/index');



const router = express.Router();

router.post('/create', postUser);
router.get('/allprofile', auth,allProfiles);
router.post('/login',auth,loginUser);
router.get('/myprofile', auth,myProfile);
router.post('/addreview', auth,addReview);
router.get('/myreview', auth,myReview);

module.exports = router;
