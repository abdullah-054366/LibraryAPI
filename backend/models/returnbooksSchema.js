
const mongoose = require('mongoose');

const returnBookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    copieId: {
        type: String,
        required: true

    },
    returnDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true
    },
    condition: {
        type: String,
        enum: ['Good', 'Damaged', 'Lost'],
        required: true
    },
    status: {
         type: String,
         default: null
    },
    fineAmount: {
        type: Number,
        default: 0
    },
    isOverdue:
    {
        type: Boolean,
        required: false
    },
    dayeOverdue:
    {
        type: Number,
        default: 0
    }

});


module.exports = mongoose.model('ReturnBook', returnBookSchema);