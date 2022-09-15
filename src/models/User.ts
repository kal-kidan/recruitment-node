const { DataTypes } = require('sequelize');
import sequelize from "../utils/db-connection";
import bcrypt from 'bcrypt';
const User = sequelize.define('User', { 
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  email: {
    type: DataTypes.STRING,
    unique: true, 

  },
  password: {
    type: DataTypes.STRING, 
  }
});

(async function(){
  await sequelize.sync();;
})();

User.beforeSave((user)=>{
    const password = String(user.get("password"));
    const hashedPassword =  bcrypt.hashSync(password, 10);
    user.set("password", hashedPassword) 
});

export default User;