import Joi from "joi";
import User from "../../models/user.js";
import bcrypt from "bcryptjs";
import UserDTO from "../../dto/user.js";
import JWTService from "../../services/JWTService.js";
import RefreshToken from "../../models/token.js";
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const login = async (req, res, next) => {
    // 1. Validate User Input
    const userLoginSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      password: Joi.string().pattern(passwordPattern).required(),
    });
  
    const { error } = userLoginSchema.validate(req.body);
  
    // 2. If validation error, return error
    if (error) {
      return next(error);
    }
  
    // 3. match username and password
    const { username, password } = req.body;
    let user;
  
    try {
      user = await User.findOne({ username: username });
  
      // match username
      if (!user) {
        const error = {
          status: 401,
          message: "Invalid username",
        };
  
        return next(error);
      }
  
      // match password
      const match = await bcrypt.compare(password, user.password);
  
      if (!match) {
        const error = {
          status: 401,
          message: "Invalid password",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }
  
    // 4. return response
    const accessToken = JWTService.signAccessToken({ _id: user._id }, "30m");
    const refreshToken = JWTService.signRefreshToken({ _id: user._id }, "60m");
  
    // Update refresh Token in DB
    try {
      await RefreshToken.updateOne(
        {
          _id: user._id,
        },
        { token: refreshToken },
        { upsert: true }
      );
    } catch (error) {
      return next(error);
    }
  
    // Store Tokens in Cookies
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
  
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
  
    const userDto = new UserDTO(user);
    return res.status(200).json({ user: userDto, auth: true });
  };


  export default login;