const mongoose = require('mongoose');

            
const generalsettings = new mongoose.Schema({

    libraryName: {
        type: String,
       
    },
    description: {
        type: String,
       
    },
    language: {
        type: String,
       
    },
    timezone: {
        type: String,
       
    },
    currency: {
        type: String,
       
    },
    paginationLimit: {
        type: String,
       
    },

})

module.exports = mongoose.model('generalsetting', generalsettings);






