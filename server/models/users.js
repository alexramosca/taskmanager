const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  const users = sequelize.define('users', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validade: {
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [5,15]
      }
      
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  })
 
  return users;
}
