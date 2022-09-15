import Joi from 'joi'
export default class Validations {
  public static transferCertificate = {
    body: Joi.object().keys({
      userId: Joi.number().required(),
      certificateId: Joi.number().required() 
    }),
  };  
}