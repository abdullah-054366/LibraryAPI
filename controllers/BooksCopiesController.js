const BookCopieSchema = require("../models/bookCopieSchema.js");
const path = require("path");
const mongoose = require("mongoose");



async function getListBookCopies(req, res) {
    try {
        const listBookCopies = await BookCopieSchema.find().populate('bookId', 'title genre coverImage');
        res.status(200).json(listBookCopies);

    } catch (error) {

        res.status(400).json({ Message: error });
    }

};

async function getBookCopieById(req, res) {
    try {
        const { id } = req.params;
        const BookCopie = await BookCopieSchema.findById(id).populate('bookId', 'title genre coverImage');
        res.status(200).json(BookCopie);
    } catch (error) {
        res.status(400).json({ Message: error });
    }
}

function storeImage(req) {
    if (!req.file) return null;
    const fileUrl = `http://localhost:3000/public/imgs/${req.file.filename}`;
    return fileUrl;
}

async function createBookCopies(req, res) {
    try {
        const { bookId, copies } = req.body;

        // تحقق من صحة الـ ObjectId
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({ message: "bookId غير صالح" });
        }

        // تجهيز البيانات
        const preparedCopies = copies.map(copy => ({
            // bookId: new mongoose.Types.ObjectId(bookId),
            bookId: bookId,
            copieId: copy.copieId,            // انتبه للاسم
            status: copy.status || "Available"
        }));

        // إدخال جماعي
        await BookCopieSchema.insertMany(preparedCopies, { ordered: false })
            .then(result => console.log("تمت إضافة العناصر غير المكررة"))
            .catch(err => console.log("تم تجاهل العناصر المكررة"));


        console.log("النسخ المُعدة للإدخال:", preparedCopies);

        res.status(201).json({
            message: "تمت إضافة النسخ بنجاح",
            copies: preparedCopies
        });

    } catch (error) {
        console.error("خطأ في إنشاء النسخ:", error);

        // معالجة خطأ التكرار
        if (error.code === 11000) {
            return res.status(400).json({
                message: "copyCode مكرر، توجد نسخ مضافة مسبقًا",
                error: error.keyValue
            });
        }

        res.status(500).json({
            message: "حدث خطأ في الخادم",
            error: error.message
        });
    }
}


async function updateBookCopie(req, res) {

    try {
        const { id } = req.params;
        const { title, author, isbn, genre, details, publicationDate, available, price } = req.body;
        const updatedBookCopie = {
            title: title.trim(),
            author: author.trim(),
            isbn: isbn.trim(),
            genre: genre.trim(),
            details,
            publicationDate: new Date(publicationDate),
            price: Number(price),
            available: available ?? true,
            coverImage: storeImage(req),
            copies: Array.isArray(req.body.copies)
                ? req.body.copies
                : JSON.parse(req.body.copies || "[]"),
        };

        await BookCopieSchema.findByIdAndUpdate(id, updatedBookCopie);
        res.status(200).json('تم التعديل بنجاح');

    } catch (error) {
        res.status(400).json({ Message: error });
    }
}
async function updateBookCopieStatus(req, res) {

    try {
        const { copieId } = req.params;
        const { status } = req.body;


        await BookCopieSchema.updateOne(
            { copieId: copieId },        // الشرط
            { $set: { status: status } }, // التحديث
            { new: true }
        );


        res.status(200).json('تم الاستعارة بنجاح');


    } catch (error) {
        res.status(400).json({ Message: error });
    }
}


async function deleteBookCopie(req, res) {
    // Implementation for deleting a BookCopie
    try {
        const { id } = req.params;
        await BookCopieSchema.findByIdAndDelete(id);
        res.status(200).json('تم الحذف بنجاح');
    } catch (error) {
        res.status(400).json({ Message: error });
    }
}

module.exports = {
    getListBookCopies,
    createBookCopies,
    getBookCopieById,
    updateBookCopie,
    deleteBookCopie,
    updateBookCopieStatus,


};