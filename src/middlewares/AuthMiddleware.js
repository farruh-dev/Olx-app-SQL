const users = require("../models/UserModel");
const { verifyToken } = require("../modules/jwt");


async function AuthMiddleware(req, res, next) {
    try {
        if(!req.cookies.token) {
            next()
            return;
        }

        const data = await verifyToken(req.cookies.token);

        
        if(!data){
            next()
            return;
        }
        
        const user = await users.findOne(
            {
                _id: data.id
            }
        )
            

        req.user = user;

        next()
    } catch (error) {
        console.log(error);
        next()
    }
}

module.exports = AuthMiddleware