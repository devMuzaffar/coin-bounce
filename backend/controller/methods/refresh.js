import UserDTO from "../../dto/user.js";
import RefreshToken from "../../models/token.js";
import User from "../../models/user.js";
import JWTService from "../../services/JWTService.js";
const unAuthError = {
  status: 401,
  message: "Unauthorized",
};

const refresh = async (req, res, next) => {
  // 1. get refreshtoken from cookies
  const originalRefreshToken = req.cookies.refreshToken;

  // 2. verify refresh token
  let id;
  try {
    id = JWTService.verifyRefreshToken(originalRefreshToken)._id;
  } catch (e) {
    return next(unAuthError);
  }

  // 3. generate new tokens
  try {
    const match = await RefreshToken.findOne({
      _id: id,
      token: originalRefreshToken,
    });

    if (!match) {
      return next(unAuthError);
    }
  } catch (e) {
    return next(e);
  }

  try {
    const accessToken = JWTService.signAccessToken({ _id: id }, "30m");
    const refreshToken = JWTService.signRefreshToken({ _id: id }, "60m");
    await RefreshToken.updateOne({ _id: id }, { token: refreshToken });
    const options = {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    };

    res.cookie("accessToken", accessToken, options);
    res.cookie("refreshToken", refreshToken, options);
  } catch (e) {
    return next(e);
  }

  // 4. update db, return response
  const user = await User.findOne({ _id: id });
  const userDto = new UserDTO(user);
  return res.status(200).json({ user: userDto, auth: true });
};

export default refresh;
