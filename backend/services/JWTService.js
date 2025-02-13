import jwt from 'jsonwebtoken';
import RefreshToken from '../models/token.js';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// Access token - short expiry time
// Refresh Token - longer expiry time
// Static method to access without creating new object everytime

class JWTService{
    // Sign access token
    static signAccessToken = (payload, expiryTime) => jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: expiryTime});

    // Sign Refresh token
    static signRefreshToken = (payload, expiryTime) => jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: expiryTime});

    // Verify access token
    static verifyAccessToken = (token) => jwt.verify(token, ACCESS_TOKEN_SECRET);
    
    // Verify refresh token
    static verifyRefreshToken = (token) => jwt.verify(token, ACCESS_TOKEN_SECRET);   

    // Store refresh token
    static storeRefreshToken = async (token, userId) => {
        try {
            // Create New Token Document
            const newToken = new RefreshToken({
                token: token,
                userId: userId
            });

            // Store in DB
            await newToken.save();
        } catch (error) {
            console.log(error);
        }
    }
}

export default JWTService;