
const ReservationsSettingsSchema = require('../../models/models_settings/ReservationsSettingSchema');

async function getReservationsSettings(req, res) {
    try {
        const reservationsSettings = await ReservationsSettingsSchema.find();
        res.status(200).json(reservationsSettings);
    } catch (error) {
        res.status(400).json({ Message: error });
    }
};

async function updateReservationsSettings(req, res) {
    try {
        const {
            maxReservations,
            validityDays,
            orderStrategy,
            autoCancel
        } = req.body;

        const reservationsSettings = await ReservationsSettingsSchema.findOne();

        if (!reservationsSettings) {
            await ReservationsSettingsSchema.create({
                maxReservations,
                validityDays,
                orderStrategy,
                autoCancel
            });
            return res.status(201).json({
                message: "تم إنشاء إعدادات الحجز بنجاح",
            });
        }

        reservationsSettings.maxReservations = maxReservations;
        reservationsSettings.validityDays = validityDays;
        reservationsSettings.orderStrategy = orderStrategy;
        reservationsSettings.autoCancel = autoCancel;

        await reservationsSettings.save();

        res.status(200).json({
            message: "تم تحديث الإعدادات بنجاح",
            data: reservationsSettings
        });

    } catch (error) {
        console.error("خطأ في تحديث الإعدادات:", error);
        res.status(500).json({
            message: "حدث خطأ في الخادم",
            error: error.message
        });
    }
}

module.exports = {
    getReservationsSettings,
    updateReservationsSettings
};