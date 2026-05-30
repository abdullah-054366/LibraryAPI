const mongoose = require("mongoose");

const borrowingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
     
        },
        bookId: {
           type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true,
        },
        copyId: {
            type: String,
            required: true,
        },
        dueDate: {
            type: Date,
            required: false,
        },
   
    },
    { timestamps: true }
);

module.exports = mongoose.model("Borrowing", borrowingSchema);