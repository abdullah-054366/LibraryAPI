const express = require("express");
const router = express.Router();

const {
    gitGeneralSettings,
    updateGeneralSettings

} = require("../../controllers/controllers_settings/GeneralsettingsController");




router.get("/",gitGeneralSettings );
router.put("/",updateGeneralSettings );


module.exports = router;