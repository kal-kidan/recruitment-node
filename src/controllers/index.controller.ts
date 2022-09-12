import httpStatus from 'http-status'
import {catchAsync} from '../utils/catchAsync';
import Services from '../services/index.service'
import {Request, Response} from 'express' 
export default class IndexController{
  public services: any;
  constructor(){
    this.services = new Services();
  }
  public getCertificates = catchAsync(async (req: Request, res: Response) => {
    const certificates = await this.services.getCertificates( );
    res.status(httpStatus.OK).send();
  }); 
}

