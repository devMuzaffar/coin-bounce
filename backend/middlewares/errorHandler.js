import Joi from "joi";

const errorHandler = (error, req, res, next) => {
  // default error
  let status = 500;
  let data = {
    message: "Internal Server Error",
  };

  if (error instanceof Joi.ValidationError) {
    status = 401;
    data.message = error.message;

    return res.status(status).json(data);
  }

  if (error.staus) {
    status = error.status;
  }

  if (error.message) {
    data.message = error.message;
  }

  return res.status(status).json(data);
};

export default errorHandler;
