import Joi from "joi";
import { imagePattern, mongodbIdPattern } from "../blogController.js";
import Blog from "../../models/blog.js";
import fs from "fs";
import { BACKEND_SERVER_PATH } from "../../config/index.js";

const update = async (req, res, next) => {
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

  // Save new photo
  let blog;
  try {
    blog = await Blog.findOne({ _id: blogId });
  } catch (error) {
    return next(error);
  }

  if (photo) {
    let previousPhoto = blog.photoPath;
    previousPhoto = previousPhoto.split("/").at(-1);

    // delete photo
    fs.unlinkSync(`storage/${previousPhoto}`);

    // Store new photo as buffer
    const buffer = Buffer.from(photo.replace(imagePattern, ""), "base64");

    try {
      fs.writeFileSync(`storage/${imagePath}`, buffer);
    } catch (error) {
      return next(error);
    }

    // Update Blog
    await Blog.updateOne(
      { _id: blogId },
      {
        title,
        content,
        photoPath: `${BACKEND_SERVER_PATH}/storage/${imagePath}`,
      }
    );
  } else {
    await Blog.updateOne({ _id: blogId }, { title, content });
  }

  return res.status(200).json({ message: "blog updated!" });
};

export default update;
