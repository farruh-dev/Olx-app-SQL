const mongoose = require("mongoose")
require('../models/AdsModel')
require('../models/CategoryModel')
require('../models/UserModel')
 
async function mongo(){
    try {
        await mongoose.connect(process.env.MONGO_URL)

    } catch (error) {
        console.error("MONGO_ERROR", error = '')
    }
}

module.exports = mongo 