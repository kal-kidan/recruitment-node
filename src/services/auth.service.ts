import User from "../models/User";
import jwt from 'jsonwebtoken';
import configs from "../config/config";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";
import bcrypt from 'bcrypt';
export default class Services {
    constructor(){
      
    }
    public async createUser(user: any) { 
       let existingUser = await User.findOne({where: {email: user.email}})
       if(existingUser){
         throw new ApiError(httpStatus.BAD_REQUEST, "User with this email already exists.")
       }
       const createdUser: any = await User.create(user);
       const token = await jwt.sign({email: user.email}, configs.tokenKey); 
       return {name: createdUser.name, email: createdUser.email, token };
    }

    public async logIn(user: any) { 
      let existingUser: any = await User.findOne({where: {email: user.email}});
      if(!existingUser || !bcrypt.compareSync(user.password, existingUser.password) ){
        throw new ApiError(httpStatus.UNAUTHORIZED, "Wrong username or password")
      }  
      const token = await jwt.sign({email: existingUser.email}, configs.tokenKey); 
      return {name: existingUser.name, email: existingUser.email, token };
   }
  }
  