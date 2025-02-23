import Joi from "joi";
import Blog from "../../models/blog.js";
import { API_KEY, API_SECRET, CLOUD_NAME } from "../../config/index.js";
import BlogDTO from "../../dto/blog.js";
import { mongodbIdPattern } from "../blogController.js";
import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const create = async (req, res, next) => {
  // 1. Validate req body

  // Client side -> base64 encoded string -> decode -> store -> save photo's path in Db
  const createBlogSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().regex(mongodbIdPattern).required(),
    content: Joi.string().required(),
    photo: Joi.string().required(),
  });

  const { error } = createBlogSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  const { title, author, content, photo } = req.body;

  // save to cloudinary
  let response;

  try {
    response = await cloudinary.uploader.upload(photo);
  } catch (error) {
    return next(error);
  }

  // 3. save blog in db
  let newBlog;
  try {
    newBlog = new Blog({
      title,
      author,
      content,
      photoPath: response.url,
    });

    await newBlog.save();
  } catch (error) {
    return next(error);
  }

  // 4. return response with DTO
  const blogDto = new BlogDTO(newBlog);
  return res.status(201).json({ blog: blogDto });
};

export default create;
