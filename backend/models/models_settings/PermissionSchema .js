const mongoose = require('mongoose');

const PermissionSettingsSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true // مثال: books_edit
    },
    name: {
        type: String,
        required: true // مثال: "إضافة / تعديل الكتب"
    },
    description: String // شرح مختصر للصلاحية
    
}, { timestamps: true });

module.exports = mongoose.model('PermissionSettings', PermissionSettingsSchema);
