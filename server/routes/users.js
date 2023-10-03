const express = require('express');
const router = express.Router();
const sequelize = require('../config/db')();
const User = require('../models/users')(sequelize);
const bcrypt = require('bcrypt');

router.get('/', (req, res)=>{
    res.send("here the users");
})

router.post('/', async (req,res)=>{
    const user = req.body;
    try{
        //hash password
        const hashedPass = await bcrypt.hash(user.password, 10);
        const hasUserEmail = await User.findOne({where: {email: user.email}})
        const hasUserUsername = await User.findOne({where: {username: user.username}})
        if(hasUserEmail==null && hasUserUsername==null){
            const createUser = await User.create({
                email: user.email,
                username: user.username,
                password: hashedPass
            });
            res.status(200).json({email: user.email, username: user.username});
        }else{
            res.status(401).json({message: "User already exist"})
        }
        
    }
    catch(err){
        res.status(500).json({message: "Internal error"});
    }
    
   

})

module.exports = router;