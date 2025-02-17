import BlogDTO from "../../dto/blog.js";
import Blog from "../../models/blog.js";

const getAll = async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    const blogsDto = [];

    for (let i = 0; i < blogs.length; i++) {
      const dto = new BlogDTO(blogs[i]);
      blogsDto.push(dto);
    }

    return res.status(200).json({ blogs: blogsDto });
  } catch (error) {
    return next(error);
  }
};

export default getAll;
