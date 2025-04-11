const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["General User", "Admin"],
        required: true,
    }
})

// secure the password with bcrypt  
// try to clean controller.js so use this method 
// it gets called before data saving
userSchema.pre('save', async function(next){
    let user = this;
   
    if(!user.isModified('password')) {
       next();
    }
    try{
      const saltRound = 10;
      const hashed_Password = await bcrypt.hash(user.password, saltRound);
      user.password = hashed_Password;  
 
    } catch(err) {
       next(err);
    }
});

userSchema.methods.generateToken = async function(){
    try{
        const token = jwt.sign(
         {
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
         },
         process.env.JWT_SECRET_KEY,
         {
            expiresIn: "30d",
         }
       )
       console.log("token -- ",token);
       return token;
    } catch(error){
        console.error(error);
    }
}

userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
}

const userModel = new mongoose.model('userModel', userSchema)
module.exports = userModel;