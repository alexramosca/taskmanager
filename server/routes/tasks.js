const express = require("express");
const router = express.Router();
const sequelize = require('../config/db')();
const Task = require('../models/tasks')(sequelize);

router.get('/', async (req, res)=>{
    const userId = req.query.userId; // Extract userId from query parameters
    try{
        const listTaks = await Task.findAll({where: {userId: userId}});
        res.status(200).json(listTaks);
    }
    catch(err){
        res.status(500).json({message: 'Error fetching data'});
        console.log(err);
    }
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