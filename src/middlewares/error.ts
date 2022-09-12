import httpStatus from 'http-status'; 
import configs from '../config/config';
import logger from '../config/logger'; 
import ApiError from '../utils/ApiError';
import {Request, Response, NextFunction} from 'express' 
import dotenv from 'dotenv';
dotenv.config();
export const errorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode == 400
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let { statusCode, message } = err;
  if (configs.env === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
  };

  if (configs.env === "development") {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};
 