import httpStatus from 'http-status'
import {catchAsync} from '../utils/catchAsync';
import Services from '../services/auth.service'
import {Request, Response} from 'express' 
export default class IndexController{
  public services: any;
  constructor(){
    this.services = new Services();
  }
  public register = catchAsync(async (req: Request, res: Response) => {
    const user = await this.services.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
  });
  
  public logIn = catchAsync(async (req: Request, res: Response) => {
    const user = await this.services.logIn(req.body);
    res.status(httpStatus.OK).send(user);
  }); 
}
