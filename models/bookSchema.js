const mongoose = require("mongoose");

// const {} = require("./bookCopieSchema");

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        author: {
            type: String,
            required: true,
        },
        isbn: {
            type: String,
            required: true,
        },
        genre: {
            type: String,
            required: false,
        },
        details: {
            type: String,
            required: true,
        },
        publicationDate: {
            type: Date,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        available: {
            type:String ,
           
        },
        coverImage: {
            type: String,

        },


    },
    { timestamps: true } // لإضافة تاريخ الإنشاء والتحديث تلقائيًا
);

module.exports = mongoose.model("Book", bookSchema);
