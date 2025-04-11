const userModel = require("../models/user.model")

const getAllUsers = async(req, res)=>{
   try {
     const Users = await userModel.find();
     return res.status(200).json({Users})
   } catch(error) {
     return res.status(400).json({message: "Error in fetching Users"})
   }
   
}
const updateUser = async(req, res)=>{
    try {
        const {id} = req.params;
        const updatdUser = req.body; 
        const user = await userModel.findByIdAndUpdate(id, {...updatdUser}, {new: true})
        if(!user) {
            return res.status(400).json({message: "User does not exist"})
        }
         
        return res.status(200).json({user})
    } catch(error) {
        return res.status(400).json({message: "Error in user updation"})
    }
}
const deleteUser = async(req, res)=>{
    try {
        const {id} = req.params; 
        const result = await userModel.findByIdAndDelete(id)

        if(result) {
            return res.status(200).json({message: "User deleted successfully!!!"})
        }
        return res.status(400).json({message: "User does not exist"})
         
    } catch(error) {
        return res.status(400).json({message: "Error in deleting the user"})
    }
}

module.exports = {getAllUsers, updateUser, deleteUser}