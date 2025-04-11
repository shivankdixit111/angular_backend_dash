const isAdmin = (req, res, next)=>{ 
    if(req.user && req.isAdmin) return next();
    return res.status(400).json({message: "Access denied. User is not an Admin!!!"}) 
}

module.exports = isAdmin;