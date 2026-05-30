
const ReturnBook = require('../models/returnbooksSchema');

async function getAllReturnBooks(req, res) {
    try {
        const returnBooks = await ReturnBook.find();
        res.json(returnBooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function createReturnBook(req, res) {
    try {


        const { name, title, copieId, dayeOverdue, dueDate, fineAmount, isOverdue, returnDate, condition, status } = req.body;

        const newreturnBook =
        {

            name,
            title,
            copieId,
            dayeOverdue,
            dueDate,
            fineAmount,
            isOverdue,
            returnDate,
            condition,
            status

        }

        await ReturnBook.create(newreturnBook);
        res.status(201).json(ReturnBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

async function getReturnBookById(req, res) {
    try {
        const returnBook = await ReturnBook.findById(req.params.id);
        if (!returnBook) {
            return res.status(404).json({ message: 'Return book not found' });
        }
        res.json(returnBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function updateReturnBook(req, res) {
    try {
        const returnBook = await ReturnBook.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!returnBook) {
            return res.status(404).json({ message: 'Return book not found' });
        }
        res.json(returnBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

async function deleteReturnBook(req, res) {
    try {
        const returnBook = await ReturnBook.findByIdAndDelete(req.params.id);
        if (!returnBook) {
            return res.status(404).json({ message: 'Return book not found' });
        }
        res.json({ message: 'Return book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function updatePayFineStatus(req, res) {
    try {


        const { status, isOverdue, fineAmount } = req.body;

        const returnBook = await ReturnBook.findByIdAndUpdate(
            req.params.id,
            {
                $set: { status, isOverdue, fineAmount },

            },
            { new: true, runValidators: true }
        );

        if (!returnBook) {
            return res.status(404).json({ message: 'Return book not found' });
        }
        res.json(returnBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

module.exports = {
    createReturnBook,
    getAllReturnBooks,
    getReturnBookById,
    updateReturnBook,
    deleteReturnBook,
    updatePayFineStatus
};