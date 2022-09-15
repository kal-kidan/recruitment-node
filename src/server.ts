import express from 'express';
import {Request, Response, NextFunction} from 'express'; 
import httpStatus from 'http-status' ; 
import cors from 'cors';
import { errorConverter, errorHandler } from './middlewares/error';
import authLimiter from './middlewares/rateLimiter'; 
import ApiError from './utils/ApiError'   
import configs from './config/config';
import routes from './routes/index'; 

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



export default app;
