const express = require('express');
const router = express.Router();
const sequelize = require('../config/db')();
const User = require('../models/users')(sequelize);
const bcrypt = require('bcrypt');

//authentication
const {createToken, validateToken} = require('./JWT');

router.get('/', validateToken, (req, res)=>{
    res.send("here the users");
})

router.post('/register', async (req, res)=>{
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
        console.log(err);
    }
    
   

})

router.post('/login', async (req, res)=>{
    const user = req.body;
    try{
        const findUser = await User.findOne({where: {username: user.username}})
        if (findUser == null){
            res.status(400).json({message: "Username or password incorrect"})
        }
        else {
            const isValid = await bcrypt.compare(user.password, findUser.password)
            if(isValid){
                const accessToken = createToken(findUser);
                res.cookie("access-token", accessToken, {
                    maxAge: 60*60*24*30*1000,
                    httpOnly: true,
                });
                res.status(200).json({message: "LOGIN SUCCESSFULLY"})
            }
            else {
                res.status(403).json({message:"Invalid credentials!"})
            }
        }
    }
    catch(err){
        res.status(500).json({error : err })
        console.log(err)
    }
})

router.delete('/delete', async (req, res)=>{
    const user = req.body;
    try{
        const findUser = await User.findOne({where: {email: user.email}})
        if(findUser != null){
            findUser.destroy();
            res.status(204).json({message: "Account deleted successfully"})
        }
        else {
            res.status(404).send("User not Found")
        }
    }
    catch(err){
        res.status(500).json({message: err})
    }
    
    
})

module.exports = router;