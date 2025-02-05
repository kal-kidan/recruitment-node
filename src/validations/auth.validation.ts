import Joi from 'joi'
export default class Validations {
  public static createUser = {
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(), 
    }),
  }; 

  public static logIn = {
    body: Joi.object().keys({ 
      email: Joi.string().email().required(),
      password: Joi.string().required(), 
    }),
  }; 
}