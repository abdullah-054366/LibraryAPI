const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true }, // admin, librarian, user
    name: { type: String, required: true }, // "مدير النظام"
    permissions: [{ type: String, ref: 'Permission' }] // نخزن key من Permission
}, { timestamps: true });

module.exports = mongoose.model('Role', RoleSchema);
