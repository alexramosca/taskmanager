
const {DataTypes} = require('sequelize');
module.exports = (sequelize)=>{

    const Task = sequelize.define("tasks", {
        taskId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'userId'
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('Done', 'In-Progress', 'Expired'),
            defaultValue: 'In-Progress'
        },
        dueDate: {
            type: DataTypes.DATEONLY
        }


    })
    return Task;
}
