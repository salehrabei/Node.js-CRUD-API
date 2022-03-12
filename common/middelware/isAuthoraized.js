const jwt =require('jsonwebtoken');
const rbac = require('../rbac/rbac');
// const rbac = require('../rbac/rbac');

module.exports =(endpoint)=>{
    return async (req,res,next)=>{

         //console.log(req.headers.authorization);
        const token = req.headers.authorization ;
        console.log(token);
         var decoded = jwt.verify(token,'shhhh');
         const isAllowed = await rbac.can(decoded.role ,endpoint)
         console.log(isAllowed);
        //  req.user=decoded
        //  next()
    }
}; 