import Joi from "joi";
import { mongodbIdPattern } from "../blogController.js";
import Comment from "../../models/comment.js";
import CommentDTO from "../../dto/comment.js";

const getById = async (req,res,next) => {
    const getByIdSchema = Joi.object({
        id: Joi.string().regex(mongodbIdPattern).required(),
    });

    const {error} = getByIdSchema.validate(req.params);

    if(error){
        return next(error);
    }

    const {id} = req.params;

    let comments;

    try {
        comments = await Comment.find({ blog: id }).populate('author');
    } catch (error) {
        return next(error);
    }

    let commentsDto = [];

    for(let i = 0; i < comments.length; i++){
        const obj = new CommentDTO(comments[i]);
        commentsDto.push(obj);
    }

    return res.status(200).json({data: commentsDto});
}

export default getById;