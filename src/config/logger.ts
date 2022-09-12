import { createLogger, format, transports } from 'winston'
import configs from './config';


const { combine, printf } = format;
const winstonFormat = printf(
  ({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`
);
const { timestamp } = format;
const logger = createLogger({
  level: configs.env === "development" ? "debug" : "info",
  format: combine(
    timestamp(),
    winstonFormat,
    configs.env === "development" ? format.colorize() : format.uncolorize()
  ),
  transports: [new transports.Console()],
});
 
export default logger;
