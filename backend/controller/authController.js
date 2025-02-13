import Joi from "joi";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
import UserDTO from "../dto/user.js";
import JWTService from "../services/JWTService.js";
import RefreshToken from "../models/token.js";

//
// Login Controller
//
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
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });

  const userDto = new UserDTO(user);
  return res.status(200).json({ user: userDto });
};

//
// Register Controller
//
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
    accessToken = JWTService.signAccessToken(
      { _id: user._id, username: user.username },
      "30m"
    );
    refreshToken = JWTService.signRefreshToken(
      { _id: user._id, username: user.username },
      "60m"
    );
  } catch (error) {
    return next(error);
  }

  // Store Refresh & Access Token in DB
  await JWTService.storeRefreshToken(refreshToken, user._id);

  // Store Refresh & Access Token in Cookies (client)
  res.cookie("accessToken", accessToken, {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,
  });
  res.cookie("refreshToken", refreshToken, {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,
  });

  // 6. response send
  const userDto = new UserDTO(user);
  return res.status(201).json({ user: userDto });
};

const authController = {
  login,
  register,
};

export default authController;
