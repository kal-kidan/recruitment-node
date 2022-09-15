import { Sequelize } from 'sequelize';
import configs from '../config/config'; 
const sequelize = new Sequelize(configs.dbName, configs.dbUsername, configs.dbPassword, {
    host: configs.dbHost,
    dialect: 'mysql',
    logging: false
});
export default sequelize;