const {
    UserLoginGetController,
    UserRegistrationGetController,
    UserRegisterPostController,
    UserVerifyGetController,
    UserLoginPostController,
    UserProfileGetController,
    UserReVerifyController,
    UserReverifyGetController,
    UserLogoutController,
    UserOwnProfileGetController
} = require("../controllers/UserRouteController")


const AuthMiddleware = require("../middlewares/AuthMiddleware")

const router = require("express").Router()

router.get('/login', UserLoginGetController)
router.get('/register', UserRegistrationGetController)
router.get('/reverify', UserReverifyGetController)
router.get('/profile/my_profile', AuthMiddleware, UserOwnProfileGetController)
router.get('/logout', AuthMiddleware, UserLogoutController)
router.post('/register', UserRegisterPostController)
router.post('/login', UserLoginPostController)
router.get('/reverify/:id', UserReVerifyController)
router.get('/verify/:id', UserVerifyGetController)
router.get('/profile/:id', AuthMiddleware, UserProfileGetController)

module.exports = {
    path: "/users",
    router
}