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
    const today = new Date()
    const testDate = new Date(req.body.dueDate)

    today.setUTCHours(0, 0 , 0 , 0)
    testDate.setUTCHours(1,0,0,0)
    console.log(today)
    if (testDate < today){
        return res.status(400).json({message: "Dates in past are not allowed"})
    }
    else {

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

    }
    
    
    
})
router.delete('/delete', validateToken, async (req, res)=>{
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

router.patch('/update', async(req, res)=>{
    const task = req.body;
    try{
        const findTask = await Task.findOne({where: {taskId: task.taskId}})
        if(findTask){
            findTask.title = task.title
            findTask.description = task.description
            findTask.dueDate = task.dueDate

            await findTask.save()

            res.status(200).json({message: "Task updated successfully"})
        }
    }
    catch(err){
        console.log(err)
    }
})

router.patch('/done', async (req, res)=>{
    const taskId = req.body.taskId
    const findTask = await Task.findOne({where: {taskId: taskId}})
    if(!findTask){
        res.status(404).json("No task found")
    }
    else {
        findTask.status = "Done";
        await findTask.save();
        res.status(200).json({message: "Task updated succefully"})
    }
})

module.exports = router;