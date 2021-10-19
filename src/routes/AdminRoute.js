const { AdminPanelGetController, AdminAddCategoryPostController } = require("../controllers/AdminRouteController")

const router = require("express").Router()

router.get('/admin_panel', AdminPanelGetController)
router.post('/add_category', AdminAddCategoryPostController)


module.exports = {
    path: "/admin",
    router
}