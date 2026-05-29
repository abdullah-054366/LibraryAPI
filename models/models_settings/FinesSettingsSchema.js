const mongoose = require('mongoose')


const finesSettingsSchema = mongoose.Schema({


    dailyFine: {
        type: Number,
        default: 0
    },
    lostBookFine: {
        type: Number,
        default: 0
    },
    maxFineLimit: {
        type: Number,
        default: 0
    },
    disableThreshold: {
        type: Number,
        default: 0
    },
    allowPartialPayment: {
        type: Boolean,
        default: false
    },


})



module.exports = mongoose.model('FinesSettings', finesSettingsSchema);