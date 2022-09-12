import Joi from 'joi'
export default class Validations {
  public static getCertificates = {
    query: Joi.object().keys({
      id: Joi.string().required(), 
    }),
  }; 
}