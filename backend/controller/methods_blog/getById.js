import Joi from "joi";
import Blog from "../../models/blog.js";
import BlogDetailsDTO from "../../dto/blog-details.js";
import { mongodbIdPattern } from "../blogController.js";

const getById = async (req, res, next) => {
  // validate Id
  const getByIdSchema = Joi.object({
    id: Joi.string().regex(mongodbIdPattern).required(),
  });

  const { error } = getByIdSchema.validate(req.params);

  if (error) {
    return next(error);
  }

  // response
  let blog;
  const { id } = req.params;

  try {
    blog = await Blog.findOne({ _id: id }).populate("author");
    if(blog === null){
      throw Error();
    }
  } catch (error) {
    return next(error);
  }

  const blogDto = new BlogDetailsDTO(blog);

  return res.status(200).json({ blog: blogDto });
};

export default getById;
