const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        min: [3, "Ism minimum 3 ta harf bo'lishi lozim"],
        max: [36, "Ism maximum 36 ta harf bo'lishi lozim"],
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        min: [6, "Parol uzunligi minimum 6 ta belgi bo'lishi lozim"],
        required: true,
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false,
    }
})

const users = mongoose.model("Users", userSchema);

module.exports = users;