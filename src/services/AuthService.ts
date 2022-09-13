import User from "../models/User";
import jwt from 'jsonwebtoken';
import configs from "../config/config";
export default class Services {
    constructor(){
      
    }
    public async createUser(user: any) { 
       let createdUser: any = await User.create(user);
       const token = await jwt.sign({email: user.email}, configs.emailKey); 
       return {name: createdUser.name, email: createdUser.email, token };
    }
  }
  