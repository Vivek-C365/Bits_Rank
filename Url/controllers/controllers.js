// These are the Models and Controllers used in the project
const { Url, User } = require('../model/model')

//this is for generate the random strings for short url
const shortid = require('shortid');

const { generateAccessTokenAndRefreshToken } = require('../Middlewares/Token_auth')

const options = {
    httpOnly: true,
    secure: true,
};

// Handle login
const login = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);

        await User.findById(user._id).select(" -password -refreshToken");



        return res
            .status(200)
            .cookie("refreshToken", refreshToken, options)
            .json({ message: "Logged in successfully", accessToken });

    } catch (error) {
        // res.status(500).json({ message: "Login Internal Server Error" });
        res.status(500).json(error.message);
    }
};

// this is for signup
const signup = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    try {
        const newUser = await User.create({ email, password });

        // Remove the password field from the response
        const userFind = await User.findById(newUser.id, '-password -__v');

        res.status(201).json(userFind);
    } catch (err) {
        res.status(500).json({ message: "SignUp Internal Server Error" });
    }
}


const logout = async (req, res) => {
    res
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .status(200)
        .json({ message: "Logged out successfully" });
};


const adminlogin = (req, res) => {
    console.log(req.jwtuserplayload.user);
    res.json({ message: "Welcome Admin! You have access to this route." });
};







////////////////////////////////////////////////////////////////////////////////////////////////////////



// This function is used to generate short url
const generateShortUrl = async (req, res) => {
    const { url, custom_link } = req.body;
    if (!url) {
        return res.status(400).json({ message: "url is required" });
    }

    // If a custom slug is provided, check if it's already taken
    if (custom_link) {
        const existingUrl = await Url.findOne({ short_url: custom_link });
        if (existingUrl) {
            return res.status(400).json({ error: 'Custom slug is already in use!' });
        }
    }

    const short_url = custom_link || shortid.generate();

    // const short_url = shortid.generate();
    await Url.create({
        original_url: url,
        short_url,
        createby: req.jwtuserplayload.id,
    });

    res.status(201).json({ message: "url created" });
}


// this is for getting the all urls from the database
const geturls = async (req, res) => {
    try {

        const urls = await Url.find({ createby: req.jwtuserplayload.id });
        if (!urls) {
            return res.status(404).json({ message: "No urls found" });
        }

        res.status(200).json(urls);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


// this is for getting the specific url by short url and increment the click count
const getspecificurl = async (req, res) => {
    const short_url = req.params.short_url

    if (!short_url) {
        return res.status(404).json({ message: "Some error occured" });
    }


    try {
        const getshorturl = await Url.findOneAndUpdate({ short_url }, { $inc: { access_count: 1 } }, { new: true });
        if (!getshorturl) {
            return res.status(404).json({ message: "Url is not present" });
        }
        // return res.redirect(getshorturl.original_url)
        return res.status(200).json({ getshorturl, message: "Url found", });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = { generateShortUrl, signup, login, adminlogin, geturls, getspecificurl, logout } 