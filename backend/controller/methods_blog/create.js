import Joi from "joi";
import fs from 'fs';
import Blog from '../../models/blog.js';
import {BACKEND_SERVER_PATH} from '../../config/index.js';
import BlogDTO from '../../dto/blog.js';
import { imagePattern, mongodbIdPattern } from "../blogController.js";

const create = async (req,res,next) => {
    // 1. Validate req body

    // Client side -> base64 encoded string -> decode -> store -> save photo's path in Db
    const createBlogSchema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string().regex(mongodbIdPattern).required(),
        content: Joi.string().required(),
        photo: Joi.string().required(),
    });

    const {error} = createBlogSchema.validate(req.body);

    if(error){
        return next(error);
    }

    const {title, author, content, photo} = req.body;

    // 2. handle photo storage, naming
    // read as buffer
    const buffer = Buffer.from(photo.replace(imagePattern,''), 'base64');

    // allot a random name
    const imagePath = `${Date.now()}-${author}.png`;

    // save locally
    try {
        fs.writeFileSync(`storage/${imagePath}`, buffer);
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
            photoPath: `${BACKEND_SERVER_PATH}/storage/${imagePath}`
        });

        await newBlog.save();

    } catch (error) {
        return next(error);
    }

    // 4. return response with DTO
    const blogDto = new BlogDTO(newBlog);
    return res.status(201).json({blog: blogDto});


}


export default create;