import User from "../models/User";
import jwt from 'jsonwebtoken';
import configs from "../config/config";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";
import bcrypt from 'bcrypt';
import Certificate from "../models/Certificate";
import { Op } from "sequelize";
export default class Services {
    constructor(){
      
    }
    public async getAvailableCertificate() { 
       return await Certificate.findAll({where: {status: "available"}}) 
    }

    public async getMyCertificates(userId: any) { 
        return await Certificate.findAll({ where: { owner: userId }}) 
    }

    public async transferCertificate(body: any, userId: any) { 
        const certificate: any = await Certificate.findOne({ where: { id : body.certificateId}})
        if(!certificate){
            throw new ApiError(httpStatus.NOT_FOUND, "Certificate not found.")
        }
        if(certificate.owner != userId){
            throw new ApiError(httpStatus.UNAUTHORIZED, "You can't transfer this certificate.")
        }
        certificate.owner = body.userId;
        certificate.status = "transferred";
        return await certificate.save()
    }
  }
  