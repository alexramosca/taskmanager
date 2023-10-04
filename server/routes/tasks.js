const express = require("express");
const router = express.Router();
const sequelize = require('../config/db')();
const Task = require('../models/tasks')(sequelize);

router.get('/', (req, res)=>{
    res.send("here your tasks");
})

router.post('/', async (req, res)=>{
    const task = req.body;
    try {
        const createTask = await Task.create(task);
        res.status(200).json({message: "Task created succesfully"})
    }
    catch(err){
        res.status(401).json({error:"Error creating the task"});
        console.log(err)
    }
    
})

module.exports = router;