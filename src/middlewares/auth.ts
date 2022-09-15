import httpStatus from 'http-status'   
import ApiError from '../utils/ApiError'; 
import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import configs from '../config/config';
import User from '../models/User';
import { catchAsync } from '../utils/catchAsync';
import { ExtendedRequest } from '../utils/ExtendedRequest';
const auth = catchAsync(async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const message = "Please authenticate"; 
  try {
    if (!req.headers.authorization) {
      throw new ApiError(httpStatus.UNAUTHORIZED, message);
    } 
    const token = req.headers.authorization.replace("Bearer ", ""); 
    const decoded: any = jwt.verify(token, configs.tokenKey)  
    const { email } = decoded;
    const user = await User.findOne( {where: { email } });  
   if(!user){
    throw new ApiError(httpStatus.UNAUTHORIZED, message);
   } 
   req.user = User 
   req.token = token
   next() 
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, message);
  }
});
export default auth;
