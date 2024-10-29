const { User } = require('../model/model')
const jwt = require('jsonwebtoken');
const generateAccessTokenAndRefreshToken = async (userId) => {
    const user = await User.findById(userId).select('-refreshToken -password');
    if (!user) throw new Error('User not found');

    const accessToken = user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
};


const accesstokenverify = async (req, res, next) => {
    const token =req.header("authorization")?.replace("Bearer ", "");
    if (!token) {
        console.log('No token provided');
        return res.status(401).send("Unauthorized: No token provided");
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const userauth = await User.findById(decoded?.id).select(' -password -refreshToken -__v');

        if (!userauth) {
            console.log('No user found');
            return res.status(404).send("Unauthorized: User not found");
        }
        console.log('User verified:- ', userauth.email);
        req.jwtuserplayload = userauth;
        next();
    } catch (error) {
        console.log('Error verifying token: ', error.message);
        res.status(401).send({ message: "Unauthorized: Invalid token jwt" });
    }

}


module.exports = { generateAccessTokenAndRefreshToken, accesstokenverify }