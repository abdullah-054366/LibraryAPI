


const GeneralSettingsSchema = require('../../models/models_settings/GeneralSettingsSchema');





async function gitGeneralSettings(req, res) {
    try {
        const GeneralSettings = await GeneralSettingsSchema.find();
        res.status(200).json(GeneralSettings);

    } catch (error) {

        res.status(400).json({ Message: error });
    }

};



async function updateGeneralSettings(req, res) {
    try {
        const {
            libraryName,
            description,
            language,
            timezone,
            currency,
            paginationLimit
        } = req.body;

        //  جلب الإعدادات (سجل واحد فقط)
        const generalSetting = await GeneralSettingsSchema.findOne();

        if (!generalSetting) {

            await GeneralSettingsSchema.create({
                libraryName,
                description,
                language,
                timezone,
                currency,
                paginationLimit
            });
            return res.status(201).json({
                message: "تم إنشاء إعدادات الغرامات بنجاح",
            });

        }

        //  تعديل القيم
        generalSetting.libraryName = libraryName;
        generalSetting.description = description;
        generalSetting.language = language;
        timezone.timezone = timezone;
        generalSetting.currency = currency;
        generalSetting.paginationLimit = paginationLimit;


        //  حفظ التعديل
        await generalSetting.save();

        res.status(200).json({
            message: "تم تحديث الإعدادات بنجاح",
            data: generalSetting
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
    gitGeneralSettings,
    updateGeneralSettings
};