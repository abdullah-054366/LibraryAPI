const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: false,
        },
        libraryCardNumber: {
            type: String,
            required: true,
        },
        roles: [
            {
                type: String,
                ref: 'Role'
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);