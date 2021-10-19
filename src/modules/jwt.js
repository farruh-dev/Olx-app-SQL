const JWT = require("jsonwebtoken")
require('dotenv').config()

async function createToken(data){
    return JWT.sign(data, process.env.JWT_SECRET)
}

async function ckechToken(token){
    try {
        return JWT.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return false
    }
}

module.exports = {
    createToken,
    verifyToken: ckechToken,
}