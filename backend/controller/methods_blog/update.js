import Joi from "joi";
import { imagePattern, mongodbIdPattern } from "../blogController.js";
import Blog from "../../models/blog.js";
import fs from "fs";
import { API_SECRET, API_KEY } from "../../config/index.js";
import { v2 as cloudinary } from "cloudinary";

const update = async (req, res, next) => {
  // Configuration
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
  });

  // validate
  const updateBlogSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    author: Joi.string().regex(mongodbIdPattern).required(),
    blogId: Joi.string().regex(mongodbIdPattern).required(),
    photo: Joi.string(),
  });

  const { error } = updateBlogSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  const { title, content, author, blogId, photo } = req.body;
  const imagePath = `${Date.now()}-${author}.png`;

  // Retrieve Current Blog Data by ID
  let blog;
  try {
    blog = await Blog.findOne({ _id: blogId });
  } catch (error) {
    return next(error);
  }

  if (photo) {
    let response;

    try {
      response = await cloudinary.uploader.upload(photo);
    } catch (error) {
      return next(error);
    }

    // Update Blog
    await Blog.updateOne(
      { _id: blogId },
      {
        title,
        content,
        photoPath: response.url,
      }
    );
  } else {
    await Blog.updateOne({ _id: blogId }, { title, content });
  }

  return res.status(200).json({ message: "blog updated!" });
};

export default update;
