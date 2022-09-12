import httpStatus from 'http-status'   
import ApiError from '../utils/ApiError'; 
import {Request, Response, NextFunction} from 'express';
const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const token = req.headers.authorization.replace("bearer ", "");
  if (token === "dGhlc2VjcmV0dG9rZW4=") {
    next();
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};
export default auth;
