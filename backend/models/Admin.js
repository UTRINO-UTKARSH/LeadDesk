const mongoose = require('mongoose');
const schema = mongoose.Schema;

const adminSchema = new schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    passwordHash: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Admin", adminSchema);