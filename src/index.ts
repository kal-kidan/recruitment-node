import app from "./server"; 
import logger from './config/logger';  
import sequelize from './utils/db-connection';
import { runSeed } from './seed/index.seed'; 
import configs from './config/config';
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
