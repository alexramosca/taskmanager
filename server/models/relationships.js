module.exports = (users, tasks) => {
    tasks.belongsTo(users, {
        foreignKey: 'userId', // Specify the custom foreign key column name
        targetKey: 'userId' // Specify the target key in the 'users' model
    });
    console.log("Relationship created between tables");
};