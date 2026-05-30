

const FinesSettingsSchema = require("../../models/models_settings/FinesSettingsSchema");





async function gitFinesSettings(req, res) {
    try {
        const FinesSetting = await FinesSettingsSchema.find();
        res.status(200).json(FinesSetting);

    } catch (error) {

        res.status(400).json({ Message: error });
    }

};



async function updateFinesSettings(req, res) {
    try {
        const {
            dailyFine,
            lostBookFine,
            maxFineLimit,
            disableThreshold,
            allowPartialPayment
        } = req.body;

        //  جلب الإعدادات (سجل واحد فقط)
        const finesSettings = await FinesSettingsSchema.findOne();

        if (!finesSettings) {

            await FinesSettingsSchema.create({
                dailyFine,
                lostBookFine,
                maxFineLimit,
                disableThreshold,
                allowPartialPayment
            });
            return res.status(201).json({
                message: "تم إنشاء إعدادات الغرامات بنجاح",
            });

        }

        //  تعديل القيم
        finesSettings.dailyFine = dailyFine;
        finesSettings.lostBookFine = lostBookFine;
        finesSettings.maxFineLimit = maxFineLimit;
        finesSettings.disableThreshold = disableThreshold;
        finesSettings.allowPartialPayment = allowPartialPayment;

        //  حفظ التعديل
        await finesSettings.save();

        res.status(200).json({
            message: "تم تحديث الإعدادات بنجاح",
            data: finesSettings
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
    gitFinesSettings,
    updateFinesSettings
};