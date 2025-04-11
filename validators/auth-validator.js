const z = require('zod'); 

const loginSchema = z.object({
    email:  
    z
    .string({message: "Email is required"}) 
    .email({message: "Invalid email address"})
    .min(3, {message: "Email must be atleast of 3 characters."})
    .max(255, {message: "Email must not be more than 255 characters."}),

    password: 
    z
    .string({message: "Password is required"}) 
    .min(4, {message: "Password must be atleast of 7 characters."})
    .max(255, {message: "Password must not be more than 255 characters."}),
})

//create an object schema
const signUpSchema = z.object({
    fullname: 
    z
    .string({message: "Name is required"})
    .trim()
    .min(3, {message: "Name must be atleast of 3 characters."})
    .max(255, {message: "Name must not be more than 255 characters."}),

    email:  
    z
    .string({message: "Email is required"}) 
    .email({message: "Invalid email address"})
    .min(3, {message: "Email must be atleast of 3 characters."})
    .max(255, {message: "Email must not be more than 255 characters."}),

    password: 
    z
    .string({message: "Password is required"}) 
    .min(4, {message: "Password must be atleast of 7 characters."})
    .max(255, {message: "Password must not be more than 255 characters."}),
 
    role: 
    z.enum(["General User", "Admin"], { message: "Role must be either General User or Admin" }) 
});

module.exports = {signUpSchema, loginSchema};