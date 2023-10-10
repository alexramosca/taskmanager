const express = require("express");
const router = express.Router();
const sequelize = require('../config/db')();
const Task = require('../models/tasks')(sequelize);
//authentication
const {validateToken} = require('./JWT');

router.get('/', validateToken, async (req, res)=>{
    
    const userId = req.user.userId;
    
        try{
            const listTasks = await Task.findAll({
                where: { userId: userId },
                order: [['dueDate', 'ASC']] // Corrected order option
              });
              res.status(200).json(listTasks);
        }
        catch(err){
            res.status(500).json({message: 'Error fetching data'});
            console.log(err);
        }
    
    
})

router.post('/create', validateToken, async (req, res)=>{
    const task = req.body;
    const userId = req.user.userId;
    try {
        const createTask = await Task.create({
            userId: userId,
            title: task.title,
            description: task.description,
            dueDate: task.dueDate
        });
        res.status(200).json({message: "Task created succesfully"})
    }
    catch(err){
        res.status(401).json({error:"Error creating the task"});
        console.log(err)
    }
    
})
router.post('/delete', validateToken, async (req, res)=>{
    const taskId = req.body.taskId;
    try{
        const deleteTask = await Task.destroy({where: {taskId: taskId}})
        if(deleteTask)
            res.status(200).json('Deleted successfully!');
        else
            res.status(304).send();
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "Internal Error"})
    }


})

module.exports = router;