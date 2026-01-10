const mongoose = require("mongoose");

const copySchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    copieId: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ["Available", "Borrowed"],
        default: "Available"
    }
}, { timestamps: true });

module.exports = mongoose.model("Copy", copySchema);
