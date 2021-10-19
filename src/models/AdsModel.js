const mongoose = require("mongoose")

const adsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    currensy: {
        type: String,
        required: true,
    },
    addedDate: {
        type: String,
        required: true,
    },
    addedTime: {
        type: String,
        required: true,
    },

    photos: [String],

    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories"
    },
    
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
})

const ads = mongoose.model("Ads", adsSchema);

module.exports = ads;