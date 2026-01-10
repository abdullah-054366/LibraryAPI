const ReservationSchema = require("../models/reservationSchema.js");


async function getReservationsList(req, res) {
    try {
        const Reservation = await ReservationSchema.find().populate('userId').populate('bookId');
        res.status(200).json(Reservation);

    } catch (error) {

        res.status(400).json({ Message: error });
    }

};

async function getReservationById(req, res) {
    try {
        const { id } = req.params;
        const book = await ReservationSchema.findById(id).populate('userId').populate('bookId');;
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ Message: error });
    }
}

async function createReservation(req, res) {
    try {
        const { userId, bookId, } = req.body;


        if (!userId || !bookId) {
            return res.status(400).json({ message: "الرجاء تعبئة جميع الحقول المطلوبة." });
        }


        const newReservation = {
            userId,
            bookId

        };


        await ReservationSchema.create(newReservation);

        res.status(201).json({ message: " تم إضافة الحجز بنجاح!" });
    } catch (error) {
        console.error(" خطأ في إنشاء الكتاب:", error);
        res.status(500).json({ message: "حدث خطأ في الخادم.", error: error.message });
    }
}

async function updateReservation(req, res) {

    try {
        const { id } = req.params;
        const { userId, bookId, } = req.body;


        if (!userId || !bookId) {
            return res.status(400).json({ message: "الرجاء تعبئة جميع الحقول المطلوبة." });
        }


        const updateReservation = {
            userId,
            bookId

        };

        await ReservationSchema.findByIdAndUpdate(id, updateReservation);
        res.status(200).json('تم التعديل بنجاح');

    } catch (error) {
        res.status(400).json({ Message: error });
    }
}

async function deleteeservation(req, res) {
    // Implementation for deleting a book
    try {
        const { id } = req.params;
        await ReservationSchema.findByIdAndDelete(id);
        res.status(200).json('تم الحذف بنجاح');
    } catch (error) {
        res.status(400).json({ Message: error });
    }
}

module.exports = {

    getReservationsList,
    getReservationById,
    createReservation,
    updateReservation,
    deleteeservation
};