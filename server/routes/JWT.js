const {sign, verify} = require('jsonwebtoken');

const createToken = (user)=>{
    const accessToken = sign({userId: user.userId, username: user.username}, "secretkey")
    console.log(user.username)
    console.log(user.userId);
    return accessToken;
}

const validateToken = (req, res, next)=>{
    const accessToken = req.cookies["access-token"];
    if(!accessToken) return res.status(401).json({message: "unauthorized"})
    else {
        try {
            const validToken = verify(accessToken, "secretkey");
          //  console.log(validToken)
            if(!validToken) return res.status(401).json({message: "unauthorized"})
            else {
                
                req.user = validToken;
                req.authenticate = true;
                next();
        }
        }
        catch(err){
            res.status(500).json({message: "Internal error"})
        }
    }
}



module.exports = {createToken, validateToken};