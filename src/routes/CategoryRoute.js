const { CategoryGetController } = require("../controllers/CategoryController")

const router = require("express").Router()

router.get('/:id', CategoryGetController)

module.exports = {
    path: "/category",
    router
}