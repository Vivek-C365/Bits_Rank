const express = require('express');

const tokenroute = express.Router();

const {newAccessTokenRefrshToken , verifyTokenRoute} = require('../controllers/token_controller');

tokenroute.route('/Newtoken').post(newAccessTokenRefrshToken)
tokenroute.route('/Verifytoken').post(verifyTokenRoute)



module.exports = tokenroute;