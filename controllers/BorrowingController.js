const Borrowings = require("../models/borrowingSchema");


async function getListBorrowing(req, res) {
    try {
        const ListBorrowings = await Borrowings.find().populate('userId').populate('bookId');
        res.status(200).json(ListBorrowings);
    } catch (error) {
        res.status(400).json({ Message: error });
    }
}

async function getBorrowingById(req, res) {
    try {
        const { id } = req.params;
        const Borrowing = await Borrowings.findById(id).populate('userId').populate('bookId');

        res.status(200).json(Borrowing);
    } catch (error) {
        res.status(400).json({ Message: error });
    }
}

async function createBorrowing(req, res) {
    try {
        const { userId, bookId, copyId, dueDate } = req.body;

        const newBorrowing = {
            userId: userId.trim(),
            bookId: bookId.trim(),
            copyId: copyId.trim(),
            dueDate: dueDate,
        };
        await Borrowings.create(newBorrowing);

        res.status(201).json({ message: "تم إنشاء الاستعارة بنجاح!" });
    } catch (error) {
        res.status(400).json({ Message: error });
    }
}

async function updateBorrowing(req, res) {
    try {
        const { id } = req.params;
        const { userId, bookId, copyId, dueDate } = req.body;

        const updatedBorrowing = {
            userId: userId.trim(),
            bookId: bookId.trim(),
            copyId: copyId.trim(),
            dueDate: dueDate,
        };

        await Borrowings.findByIdAndUpdate(id, updatedBorrowing);
        res.status(200).json('تم التعديل بنجاح');
    } catch (error) {
        res.status(400).json({ Message: error });
    }
}

async function deleteBorrowing(req, res)  {
    try {
        const { id } = req.params;
        await Borrowings.findByIdAndDelete(id);
        res.status(200).json({ message: "تم حذف الاستعارة بنجاح!" });
    } catch (error) {
        res.status(400).json({ Message: error });
    }
}


module.exports = {
    getListBorrowing,
    createBorrowing,
    getBorrowingById,
    updateBorrowing,
    deleteBorrowing
};