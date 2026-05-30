
const express = require('express');
const router = express.Router();
const {
    getReservationsSettings,
    updateReservationsSettings
} = require('../../controllers/controllers_settings/reservationsSettingsController');


router.get('/', getReservationsSettings);
router.put('/', updateReservationsSettings);
module.exports = router;