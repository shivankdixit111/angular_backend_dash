
const validate = (schema) => async (req, res, next) => {
    try{
       const parseBody = await schema.parseAsync(req.body);
       req.body = parseBody;
       next();
    } catch(err) { 
        const status = 400;
        const message = err.errors[0].message; 
        console.log(err.errors)
        return res.status(400).json({message: message})
    }
}

module.exports = validate;