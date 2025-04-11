const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authMiddleware = async (req, res, next)=>{ 
   // console.log("req.headers => ", req.headers);
   const token = await req.header('Authorization');  
   
   if(!token) {
      return res.status(400).json({msg: "Unauthorized HTTP, token not provided"});
   }
   
   const jwtToken = token.replace("Bearer ", "");  //token starts from "Bearer " + string       removing "Bearer_"
   
   try{
     const user = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY) 
     const userData = await User.findOne({email: user.email}).select({password: 0}); //don't display password 

     req.user = userData;
     req.token = jwtToken; 
     req.userId = userData._id;
     req.isAdmin = (userData.role === "Admin") ? true : false;
   } catch(error){
     return res.status(400).json({message: "Unauthorized, invalid token"});
   }

   next();
}
module.exports = authMiddleware;