import RefreshToken from "../../models/token.js";

const logout = async (req, res, next) => {
    // 1. delete refresh token from db
    const { refreshToken } = req.cookies;

    try {
        await RefreshToken.deleteOne({token: refreshToken});
    } catch (error) {
        return next(error);
    }

    // delete cookies
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    // 2. response
    res.status(200).json({user: null, auth: false});
}


export default logout;