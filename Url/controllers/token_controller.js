const jwt = require('jsonwebtoken');
const { User } = require('../model/model');
/**
 * @function verifyTokenRoute
 * @description Verifies the access token and returns a valid/invalid response
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Promise<void>}
 */
const verifyTokenRoute = (req, res) => {
    const { token } = req.body;
    const refreshToken = req.cookies?.refreshToken

    if (!token || !refreshToken) {
        console.log("verifyTokenRoute: No token was provided");
        return res.status(400).json({ message: "Token is missing" });
    }


    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log("verifyTokenRoute: Error occurred with token:", err.message);
            return res.status(403).json({ message: "Invalid or expired token" });
        }

        console.log("verifyTokenRoute: Token is valid:", user);
        return res.status(200).json({ message: "Token is valid", user });
    });
};



/**
 * @function newAccessTokenRefrshToken
 * @description Returns a new access token if the refresh token is valid
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Promise<void>}
 */
const newAccessTokenRefrshToken = async (req, res) => {
    const refreshToken = req.cookies?.refreshToken; // Safely access the refreshToken

    // Check if refresh token is provided
    if (!refreshToken) {
        return res.status(403).json({ message: "No valid refresh token provided" });
    }

    try {
        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        // Find the user and exclude sensitive fields
        const user = await User.findById(decoded.id).select("-password -email -role -__v");

        // Validate user and refresh token match
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        // Generate a new access token
        const accessToken = user.generateAccessToken();

        // Optionally set the access token in a cookie for the client to use
        // res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'Strict' });

        return res.status(200).json({ accessToken });
    } catch (error) {
        console.error("Token verification error:", error.message);
        return res.status(403).json({ message: 'Invalid refresh token' });
    }
};


module.exports = { verifyTokenRoute, newAccessTokenRefrshToken }