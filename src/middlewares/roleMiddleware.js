module.exports = (allowedRoles) => {
    return(req,res,next) => {
        const userRole = req.headers.role;

        if(!allowedRoles.includes(userRole)){
            return res.status(403).json({message: 'Access Denied'});
        }
        next();
    };
};