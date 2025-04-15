const userModel = require("../models/user.model");


const signUp = async(req, res)=>{
    const {fullname, email, password, role} = req.body;
    //check email existence
    const userExist = await userModel.findOne({email: email});
    if(userExist) {
        return res.status(400).json({message: "Email already exist"});
    } 
    
    const user = await userModel.create({fullname, email, password, role});  
    user.save(); //usermodel pre() method handles hashing of password
    console.log(user)
  
    try{
       res.status(200).json({
          user: user,
          token: await user.generateToken(),
          userId: user._id.toString(),
       });
    } catch {
       res.status(400).send("Page not found");
    }
}
const login = async(req, res)=>{
    try{
        const {email, password} = req.body;
        const userExist = await userModel.findOne({email: email});
        if(!userExist) {
            return res.status(400).json({message: "Invalid credentials"}); 
        } 
        const isPasswordValid = userExist.comparePassword(password);
        //it's instance will be called on user model
        if(isPasswordValid) {
            res.status(200).json({
                user: userExist,
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        } else { 
            res.status(400).json({message: "Invalid email or password"});
        }

     } catch(error){
       console.error(error)
     }
}

const getProfile = async(req, res)=>{
    try{
        const userData = req.user; 
        return res.status(200).json({userData})
     } catch(error) {
         return res.status(400).json({message: "Error in fetching user profile"})
     }
}
const getUserFromId = async(req, res)=>{
    try{
        const {id} = req.params;
        const user = await userModel.findByIdAndUpdate(id);
        return res.status(200).json({user})
     } catch(error) {
         return res.status(400).json({message: "Error in fetching user data"})
     }
}

module.exports = {signUp, login, getProfile, getUserFromId};