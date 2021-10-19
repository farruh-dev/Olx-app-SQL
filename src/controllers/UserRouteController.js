const {
    isValidObjectId
} = require("mongoose")
const users = require("../models/UserModel")
const ads = require("../models/AdsModel")
const {
    createCrypt,
    compareCrypt
} = require("../modules/bcrypt")
const mail = require("../modules/email")
const {
    createToken
} = require("../modules/jwt")
const {
    SignUpValidation,
    LoginValidation
} = require("../modules/validations")

const mongoose = require('mongoose')

module.exports = class UserRouteController {
    static async UserRegistrationGetController(req, res) {
        res.render('register')
    }
    static async UserLoginGetController(req, res) {
        res.render('login')
    }

    static async UserRegisterPostController(req, res) {
        try {
            const {
                name,
                email,
                password
            } = await SignUpValidation(req.body)

            const user = await users.create({
                name,
                email,
                password: await createCrypt(password)
            })

            if (user) {
                res.render('verify', {
                    message_start: `Hurmatli ${user.name}, sizning `,
                    email: user.email,
                    message_end: `pochtangizga emailni tasdiqlash uchun link jo'natildi. Davom etish uchun emailingizni tasdiqlang.`
                })
            }
            await mail(email, "Iltimos emailingizni tasdiqlang", "Tasdiqlash uchun link:", `<a href="http://localhost:7889/users/verify/${user._id}">Tasdiqlash</a>`)


        } catch (error) {
            res.render('register', {
                error: error.message
            })
        }
    }
    static async UserVerifyGetController(req, res) {
        try {
            const id = req.params.id

            if (!id) throw new Error("Verifikatsiyada xatolik yuz berdi")

            if (!isValidObjectId(id)) throw new Error("Verifikatsiyada xatolik yuz berdi")

            const user = await users.findOne({
                _id: id
            });

            if (!user) throw new Error("Verifikatsiya kaliti xato")

            const x = await users.updateOne({
                _id: id
            }, {
                isVerified: true,
            })

            res.cookie("token", await createToken({
                id: user._id
            })).redirect('/users/profile')

        } catch (error) {
            res.render("login", {
                error: error.message
            })
        }
    }
    static async UserLoginPostController(req, res) {
        try {

            const {
                email,
                password
            } = await LoginValidation(req.body)

            const user = await users.findOne({
                email: email,
            })

            if (!user) throw new Error("Bunday foydalanuvschi mavjud emas!")

            if (!await compareCrypt(password, user.password)) throw new Error("Parol xato terilgan!")

            res.cookie("token", await createToken({
                id: user._id
            })).redirect('/')

        } catch (error) {
            res.render('login', {
                error: error.message
            })
        }
    }
    static async UserProfileGetController(req, res) {
        try {

            if(req.params.id == req.user.id){
                res.redirect('/users/profile/my_profile')
                return 0
            }

            const another_user = await users.findById(req.params.id)

            const user_ads = await ads.find(
                {
                    owner_id: another_user._id
                }
            )

            res.render('profile', {

                user: req.user,
                another_user,
                user_ads
            })
        } catch (error) {
            console.log(error);
            res.redirect('/')
        }
    }
    static async UserOwnProfileGetController(req, res) {
        try {
            const user = await users.findById(req.user.id)

            const user_ads = await ads.find(
                {
                    owner_id: user._id
                }
            )

            res.render('own_profile', {
                user,
                user_ads
            })
        } catch (error) {
            console.log(error);
            res.redirect('/')
        }
    }


    static async UserReverifyGetController(req, res) {
        const user = await users.findOne({
            _id: req.user.id
        });
        res.render('verify', {
            message_start: `Hurmatli ${user.name}, sizning `,
            email: user.email,
            message_end: `pochtangizga emailni tasdiqlash uchun link jo'natildi.`,
            button: true
        })
    }


    static async UserReVerifyController(req, res) {
        const user = await users.findOne({
            _id: req.params.id
        });

        if (!user) throw new Error("Xatolik yuz berdi!")

        await mail(user.email, "Iltimos emailingizni tasdiqlang", "Tasdiqlash uchun link:", `<a href="http://localhost:7889/users/verify/${user._id}">Tasdiqlash</a>`)

        res.redirect('/users/reverify')
    }

    static async UserLogoutController(req, res) {
        res.clearCookie("token").redirect('/')
    }




}