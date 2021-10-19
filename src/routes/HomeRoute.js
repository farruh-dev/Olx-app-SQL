const { HomeGetController } = require("../controllers/HomeRouteController")

const router = require("express").Router()

router.get('/', HomeGetController)

module.exports = {
    path: "/",
    router
}