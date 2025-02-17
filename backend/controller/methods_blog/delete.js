import Joi from "joi";
import { mongodbIdPattern } from "../blogController.js";
import Blog from "../../models/blog.js";
import Comment from "../../models/comment.js";


const deleteBlog = async (req,res,next) => {
    // validate id
    const deleteBlogSchema = Joi.object({
        id: Joi.string().regex(mongodbIdPattern).required(),
    });

    const {error} = deleteBlogSchema.validate(req.params);

    if(error){
        return next(error);
    }
    const { id } = req.params;

    // delete Blog
    // delete comments on this blog
    try {
        await Blog.deleteOne({_id: id});
        await Comment.deleteMany({blog: id});
    } catch (error) {
        return next(error);
    }

    // response
    return res.status(200).json({message: 'blog deleted'});
    

}

export default deleteBlog;
