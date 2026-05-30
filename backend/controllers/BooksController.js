const bookSchema = require("../models/bookSchema.js");
const BookCopieSchema = require("../models/bookCopieSchema.js");
const path = require("path");
const fs = require("fs");

async function getListBooks(req, res) {
    try {
        const listBooks = await bookSchema.find();
        res.status(200).json(listBooks);

    } catch (error) {

        res.status(400).json({ Message: error });
    }

};

async function getBookById(req, res) {
    try {
        const { id } = req.params;
        const book = await bookSchema.findById(id);
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ Message: error });
    }
}

function storeImage(req) {
    if (!req.file) return null;
    const fileUrl = req.file.filename;
    return fileUrl;
}

async function createBook(req, res) {
    try {
        const { title, author, isbn, genre, details, publicationDate, available, price } = req.body;


        if (!title || !author || !isbn || !details || !publicationDate || !price) {
            return res.status(400).json({ message: "الرجاء تعبئة جميع الحقول المطلوبة." });
        }


        const newBook = {
            title: title.trim(),
            author: author.trim(),
            isbn: isbn.trim(),
            genre: genre.trim(),
            details,
            publicationDate: new Date(publicationDate),
            price: Number(price),
            available: available ?? true,
            coverImage: storeImage(req),

        };


        await bookSchema.create(newBook);

        res.status(201).json({ message: " تم إضافة الكتاب بنجاح!" });
    } catch (error) {
        console.error(" خطأ في إنشاء الكتاب:", error);
        res.status(500).json({ message: "حدث خطأ في الخادم.", error: error.message });
    }
}



async function updateBook(req, res) {

    try {
        const { id } = req.params;
        const { title, author, isbn, genre, details, publicationDate, available, price } = req.body;
        const updatedBook = {
            title: title.trim(),
            author: author.trim(),
            isbn: isbn.trim(),
            genre: genre.trim(),
            details,
            publicationDate: new Date(publicationDate),
            price: Number(price),
            available: available ?? true,
            coverImage: storeImage(req),

        };

        await bookSchema.findByIdAndUpdate(id, updatedBook);
        res.status(200).json('تم التعديل بنجاح');

    } catch (error) {
        res.status(400).json({ Message: error });
    }
}


async function updateBookCopieStatus(req, res) {
    try {
        const { id } = req.params;

        const bookCopie = await bookSchema.find()
        res.status(200).json(bookCopie);

        // const updatedBookCopie = {

        //     copies: Array.isArray(req.body.copies)
        //         ? req.body.copies
        //         : JSON.parse(req.body.copies || "[]"),
        // };

        // await bookSchema.findByIdAndUpdate(id, updatedBookCopie);
        // res.status(200).json('تم التعديل بنجاح');



    } catch (error) {
        res.status(400).json({ Message: error });
    }

}

async function deleteBook(req, res) {
    // Implementation for deleting a book
    try {
        const { id } = req.params;

        // البحث عن الكتاب
        const book = await bookSchema.findById(id);

        if (!book) {
            return res.status(404).json({
                message: "الكتاب غير موجود",
            });
        }

       
        // حذف الصورة من المجلد
        if (book.coverImage != null) {

            // استخراج اسم الملف من الرابط
            const imageName = book.coverImage.split("/").pop();

          
            // المسار الحقيقي للصورة
            const imagePath = path.join(process.cwd(), "public", "imgs", imageName);



            // التأكد أن الملف موجود
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await bookSchema.findByIdAndDelete(id);
        await BookCopieSchema.deleteMany({ bookId: id });
        res.status(200).json('تم الحذف بنجاح');
    } catch (error) {
        res.status(400).json({ Message: error });
    }
}

module.exports = {
    getListBooks,
    createBook,
    getBookById,
    updateBook,
    deleteBook,
    updateBookCopieStatus
};