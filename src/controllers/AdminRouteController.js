const { isValidObjectId } = require("mongoose")
const categories = require("../models/CategoryModel")
const users = require("../models/UserModel")
const { createCrypt, compareCrypt } = require("../modules/bcrypt")
const mail = require("../modules/email")
const { createToken } = require("../modules/jwt")
const { SignUpValidation, LoginValidation } = require("../modules/validations")

module.exports = class AdminRouteController {
    static async AdminPanelGetController(req, res){
        res.render('admin_panel', {
            categoryList: await categories.find()
        })
    }
    static async AdminAddCategoryPostController(req, res){
        const {name, icon} = req.body

        if(!(name, icon)) throw new Error('Xatolik')

        const x = await categories.create(
            {
                name: name,
                icon: icon,
            }
        )

        console.log(x);

        res.redirect("/admin/admin_panel")
    }
    // static async UserLoginGetController(req, res){
    //     res.render('login')
    // }

    // static async UserRegisterPostController(req, res){
    //     try {
    //         const {name, email, password} = await SignUpValidation(req.body)

    //         const user = await users.create({
    //             name, email, password: await createCrypt(password)
    //         })

    //         if(user){
    //             res.render('verify', {
    //                 message_start: `Hurmatli ${user.name}, sizning `,
    //                 email: user.email,
    //                 message_end: `pochtangizga emailni tasdiqlash uchun link jo'natildi. Davom etish uchun emailingizni tasdiqlang.`
    //             })
    //         }
    //         await mail(email, "Iltimos emailingizni tasdiqlang", "Tasdiqlash uchun link:", `<a href="http://localhost:7889/users/verify/${user._id}">Tasdiqlash</a>`)

            
    //     } catch (error) {
    //         res.render('register', {
    //             error: error.message
    //         })
    //     }
    // }
    // static async UserVerifyGetController(req, res){
    //     try {
    //         const id = req.params.id

    //         if(!id) throw new Error("Verifikatsiyada xatolik yuz berdi")

    //         if(!isValidObjectId(id)) throw new Error("Verifikatsiyada xatolik yuz berdi")

    //         const user = await users.findOne(
    //             {
    //                 _id: id
    //             }
    //         );

    //         if(!user) throw new Error("Verifikatsiya kaliti xato")

    //         const x = await users.updateOne(
    //             {
    //                 _id: id
    //             }, 
    //             {
    //                 isVerified: true,
    //             }
    //         )

    //         res.cookie("token", await createToken({id: user._id})).redirect('/users/profile')

    //     } catch (error) {
    //         res.render("login", {
    //             error: error.message
    //         })
    //     }
    // }
    // static async UserLoginPostController(req, res) {
    //     try {

    //         const {email, password} = await LoginValidation(req.body)

    //         const user = await users.findOne(
    //             {
    //                 email: email,
    //             }
    //         )

    //         if(!user) throw new Error("Bunday foydalanuvschi mavjud emas!")

    //         if(! await compareCrypt(password, user.password)) throw new Error("Parol xato terilgan!")

    //         res.cookie("token", await createToken({id: user._id})).redirect('/')

    //     } catch (error) {
    //         res.render('login', {
    //             error: error.message
    //         })
    //     }
    // }
    // static async UserProfileGetController(req, res){
    //     res.render('profile', {
    //         user: req.user
    //     })
    // }


    // static async UserReverifyGetController(req, res){
    //     const user = await users.findOne(
    //         {
    //             _id: req.user.id
    //         }
    //     );
    //     res.render('verify', {
    //         message_start: `Hurmatli ${user.name}, sizning `,
    //         email: user.email,
    //         message_end: `pochtangizga emailni tasdiqlash uchun link jo'natildi.`,
    //         button: true
    //     })
    // }


    // static async UserReVerifyController(req, res){
    //     const user = await users.findOne(
    //         {
    //             _id: req.params.id
    //         }
    //     );

    //     if(!user) throw new Error("Xatolik yuz berdi!")

    //     await mail(user.email, "Iltimos emailingizni tasdiqlang", "Tasdiqlash uchun link:", `<a href="http://localhost:7889/users/verify/${user._id}">Tasdiqlash</a>`)

    //     res.redirect('/users/reverify')
    // }

    // static async UserLogoutController(req, res) {
    //     res.clearCookie("token").redirect('/')
    // }




}