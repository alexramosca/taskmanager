module.exports = (users, tasks)=>{
    users.hasMany(tasks)
    console.log("Relationship created between tables")
}