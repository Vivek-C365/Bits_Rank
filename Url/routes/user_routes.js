const express = require('express');

const userroute = express.Router();

const { signup, login, adminlogin ,logout } = require('../controllers/controllers');
const { roleMiddleware } = require('../Middlewares/Role_auth')

const { accesstokenverify } = require('../Middlewares/Token_auth')


// this is for signup
userroute.route('/signup').post(signup);
userroute.route('/login').post(login)
userroute.route('/logout').post(logout)
userroute.route('/admin').get(accesstokenverify, roleMiddleware(['admin']), adminlogin);
userroute.route('/profile').get(accesstokenverify, roleMiddleware(['user']), login);

module.exports = userroute;