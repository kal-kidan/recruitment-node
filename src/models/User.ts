const { DataTypes } = require('sequelize');
import sequelize from "../utils/db-connection";
import bcrypt from 'bcrypt';
const User = sequelize.define('User', { 
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
    validate: {
      min: 6
    }
  },
}, {  
});

(async function(){
  await User.sync();
})();

User.beforeSave((user)=>{
    const password = String(user.get("password"));
    const hashedPassword =  bcrypt.hashSync(password, 10);
    user.set("password", hashedPassword) 
});

User.prototype.compare = function (password: string){
    return bcrypt.compareSync(password, this.password);   
}




export default User;