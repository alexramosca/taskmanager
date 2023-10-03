const Sequelize = require('sequelize');
module.exports = () =>{
    const sequelize = new Sequelize('todo', 'root', 'Canada@123', {
        host: 'localhost',
        dialect: 'mysql',
        port: 3301
    })
    return sequelize
}