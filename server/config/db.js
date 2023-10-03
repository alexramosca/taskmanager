const { Sequelize } = require('sequelize');
module.exports = ()=>{
    const db = new Sequelize({
        dialect: 'mysql', // Specify the database dialect
        host: 'localhost', // Database host
        username: 'root', // Database username
        password: 'Canada@123', // Database password
        database: 'dbtodo', // Database name
        port: 3301
    } 
    )
    return db;
}