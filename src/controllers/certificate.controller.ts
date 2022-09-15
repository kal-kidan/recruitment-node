import httpStatus from 'http-status'
import {catchAsync} from '../utils/catchAsync';
import Services from '../services/certificate.service'
import {Request, Response} from 'express' 
import { ExtendedRequest } from '../utils/ExtendedRequest';
export default class CertificateController{
  public services: any;
  constructor(){
    this.services = new Services();
  }
  public getMyCertificates = catchAsync(async (req: ExtendedRequest, res: Response) => {
    const certificates = await this.services.getMyCertificates(req.user.id);
    res.status(httpStatus.OK).send(certificates);
  });
  
  public getAvailableCertificate = catchAsync(async (req: Request, res: Response) => { 
    const certificates = await this.services.getAvailableCertificate();
    res.status(httpStatus.OK).send(certificates);
  }); 

  public transferCertificate = catchAsync(async (req: ExtendedRequest, res: Response) => {
    const certificate = await this.services.transferCertificate(req.body, req.user.id);
    res.status(httpStatus.OK).send({certificate, message: "Successfuly transfered."});
  }); 
}
