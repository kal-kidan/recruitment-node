import express from 'express';
import {Request, Response, NextFunction} from 'express'; 
import httpStatus from 'http-status' ; 
import cors from 'cors';
import { errorConverter, errorHandler } from './middlewares/error';
import authLimiter from './middlewares/rateLimiter'; 
import ApiError from './utils/ApiError'   
import configs from './config/config';
import routes from './routes/index'; 
import logger from './config/logger';  
import sequelize from './utils/db-connection';
import { runSeed } from './seed/index.seed';
import { Sequelize } from 'sequelize';
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.options("*", (req, res, next)=>{
  cors();
});

if (configs.env === "production") {
  app.use("/", authLimiter);
}
 
app.use("/", routes); 
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);

app.use(errorHandler);

const server = app.listen(configs.port, async () => {
  try { 
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
    // prepare seed
    logger.info("Inserting rows ..");
    await runSeed();
    logger.info("Seed successfuly created.");
    
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
  logger.info(`Server listening to port ${configs.port}`); 
});

const unexpectedErrorHandler = (error: any) => { 
  logger.error(error);
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});

export default app;
