import httpStatus from 'http-status'
import {catchAsync} from '../utils/catchAsync';
import Services from '../services/AuthService'
import {Request, Response} from 'express'
import User from '../models/User'; 
export default class IndexController{
  public services: any;
  constructor(){
    this.services = new Services();
  }
  public createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await this.services.createUser(req.body);
    res.status(httpStatus.OK).send(user);
  }); 
}
