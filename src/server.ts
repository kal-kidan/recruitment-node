import express from 'express';
import {Request, Response, NextFunction} from 'express'; 
import httpStatus from 'http-status' ; 
import cors from 'cors';
import { errorConverter, errorHandler } from './middlewares/error';
import authLimiter from './middlewares/rateLimiter';
import auth from './middlewares/auth';
import ApiError from './utils/ApiError'   
import configs from './config/config';
import routes from './routes/index.route'; 
import logger from './config/logger';  

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

app.use(auth);
app.use("/", routes);
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);

app.use(errorHandler);

const server = app.listen(configs.port, () => {
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
