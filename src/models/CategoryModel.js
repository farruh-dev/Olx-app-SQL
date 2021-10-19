const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        min: [3, "Nom minimum 3 ta harf bo'lishi lozim"],
        max: [24, "Nom maximum 24 ta harf bo'lishi lozim"],
        required: true,
    },
    icon: {
        type: String,
        default: '<i class="fas fa-record-vinyl"></i>'
    }
    
})

const categories = mongoose.model("Categories", categorySchema);

module.exports = categories;