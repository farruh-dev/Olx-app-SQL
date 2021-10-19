
const { isValidObjectId } = require("mongoose")
const categories = require("../models/CategoryModel")
const users = require("../models/UserModel")
const ads = require("../models/AdsModel")

module.exports = class CategoryRouteController {
    static async CategoryGetController(req, res) {

        const {id} = req.params

        console.log(id);

        if(!isValidObjectId(id)){
            res.redirect('/')
            return
        }

        const category = await categories.findOne( 
            {
                _id: id
            }
        )

        if(!category){
            res.redirect('/')
            return 0
        }

        const category_ads = await ads.find(
            {
                category_id: id
            }
        )


        res.render('category', {
            user: req.user,
            category,
            categoryList: await categories.find(),
            category_ads
        })
    }
}