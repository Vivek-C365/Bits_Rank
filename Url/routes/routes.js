const express = require('express');

const router = express.Router();

const { generateShortUrl, geturls, getspecificurl } = require('../controllers/controllers');
const { accesstokenverify } = require('../Middlewares/Token_auth')
// this is for generating short url
router.route('/Create_urls').post(accesstokenverify, generateShortUrl);

// this for getting the all urls from the database
router.route('/get_urls').get(accesstokenverify, geturls);
router.route('/get_urls/:short_url').get(getspecificurl);






module.exports = router;