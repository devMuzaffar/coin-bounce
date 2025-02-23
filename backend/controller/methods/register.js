import Joi from "joi";
import User from "../../models/user.js";
import bcrypt from "bcryptjs";
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
import UserDTO from "../../dto/user.js";
import JWTService from "../../services/JWTService.js";

const register = async (req, res, next) => {
    // 1. Validate User Input
    const userRegisterSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      name: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(passwordPattern).required(),
      confirmPassword: Joi.ref("password"),
    });
  
    const { error } = userRegisterSchema.validate(req.body);
  
    // 2. if error in validation -> return error via middleware
    if (error) {
      return next(error);
    }
  
    // 3. if email or username is alreayd registered -> return an error
    const { username, name, email, password } = req.body;
  
    try {
      const emailInUse = await User.exists({ email });
      const usernameInUse = await User.exists({ username });
  
      if (emailInUse) {
        const error = {
          status: 409,
          message: "Email Already Registered, use Another Email",
        };
  
        return next(error);
      }
  
      if (usernameInUse) {
        const error = {
          status: 409,
          message: "Username not available, Choose another username!",
        };
  
        return next(error);
      }
    } catch (error) {
      return next(error);
    }
  
    // 4. password hash
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // 5. store user data in Database
    let accessToken;
    let refreshToken;
    let user;
  
    try {
      const userToRegister = new User({
        username,
        email,
        name,
        password: hashedPassword,
      });
      user = await userToRegister.save();
  
      // Token Generation
      accessToken = JWTService.signAccessToken({ _id: user._id }, "30m");
      refreshToken = JWTService.signRefreshToken({ _id: user._id }, "60m");
    } catch (error) {
      return next(error);
    }
  
    // Store Refresh & Access Token in DB
    await JWTService.storeRefreshToken(refreshToken, user._id);
  
    // Store Refresh & Access Token in Cookies (client)
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
  
    // 6. response send
    const userDto = new UserDTO(user);
    return res.status(201).json({ user: userDto, auth: true });
  };


export default register;