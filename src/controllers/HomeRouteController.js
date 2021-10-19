
const ads = require("../models/AdsModel")
const categories = require("../models/CategoryModel")
const users = require("../models/UserModel")

module.exports = class HomeRouteController {
    static async HomeGetController(req, res) {
        const adsList = await ads.find()
        
        res.render('index', {
            user: req.user,
            categoryList: await categories.find(),
            adsList
        })
    }
}