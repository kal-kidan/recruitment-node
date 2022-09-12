import Joi from "joi";  
import * as dotenv from 'dotenv'
import path from 'path';
dotenv.config({ path: path.join(__dirname,'../.env')});
const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().positive().default(3000),
    APP_URL: Joi.string(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const configs = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  appUrl: envVars.APP_URL,
};
export default configs;
