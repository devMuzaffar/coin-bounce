// Validates ObjectId() of MongoDB's _id
export const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
export const imagePattern = /^data:image\/(png|jpg|jpeg);base64,/;

// Create Controller
import create from "./methods_blog/create.js";

// get All Controller
import getAll from "./methods_blog/getAll.js";

// get By Id Controller
import getById from "./methods_blog/getById.js";

// Update Controller
import update from "./methods_blog/update.js";

// Delete Controller
import deleteBlog from "./methods_blog/delete.js";

// Exports
const blogController = {
  create,
  getAll,
  getById,
  update,
  deleteBlog
};

export default blogController;
