const mongoose = require('mongoose');

const reservationsSettingSchema = new mongoose.Schema({

    maxReservations: {
        type: Number,
        default: 3,
        min: 1
    },
    validityDays: {
        type: Number,
        default: 5,
        min: 1
    },
    orderStrategy: {
        type: String,
        enum: ["FIFO", "LIFO" , "PRIORITY"],
        default: "FIFO"
    },

    
    autoCancel: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model("ReservationsSetting", reservationsSettingSchema);
