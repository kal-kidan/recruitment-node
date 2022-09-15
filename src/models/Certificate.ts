const { DataTypes } = require('sequelize');
import sequelize from "../utils/db-connection";
import User from "./User";
const Certificate = sequelize.define('Certificate', { 
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  status: {
    type: DataTypes.ENUM,
    values: ["available", "owned", "transferred"] 
  } ,
  owner: { type: DataTypes.INTEGER },
});
Certificate.belongsTo(User, {
    foreignKey: "owner" 
});

(async function(){
  await sequelize.sync();
})(); 

export default Certificate;