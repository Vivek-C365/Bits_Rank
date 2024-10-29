const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');

// URL Schema
const urlSchema = new Schema({
    original_url: {
        type: String,
        required: true
    },
    short_url: {
        type: String,
        required: true
    },
    access_count: {
        type: Number,
        default: 0
    },
    createby: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});

// User Schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    refreshToken: {
        type: String,
    }
}, {
    timestamps: true
});

// Generate Access Token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            id: this._id,
            email: this.email,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET, // Ensure this is set in your .env file
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE // Ensure this is set in your .env file
        }
    );
};

// Generate and Store Refresh Token
userSchema.methods.generateRefreshToken = function () {
    try {
        const refreshToken = jwt.sign(
            {
                id: this._id,
            },
            process.env.REFRESH_TOKEN_SECRET, // Ensure this is set in your .env file
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRE // Ensure this is set in your .env file
            }
        );

        // Save the refresh token to the user document
        this.refreshToken = refreshToken;
        // await this.save(); // Save the user with the new refresh token

        return refreshToken;
    } catch (error) {
        console.error("Error saving refresh token:", error);
        throw new Error("Could not save refresh token");
    }
};

// URL and User Models
const Url = model('Url', urlSchema);
const User = model('User', userSchema);

module.exports = { Url, User };
