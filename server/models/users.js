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
      validade: {
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5,15]
      }
      
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'Admin'),
      defaultValue: 'user',
      allowNull: false
    }
  }, {
    indexes:[{unique:true, fields: ['email', 'username']}]
  })
 
  return users;
}
