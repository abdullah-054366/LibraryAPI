const express = require("express");
const router = express.Router();

const {
    
    gitFinesSettings,
    updateFinesSettings
} = require("../../controllers/controllers_settings/FinesSettingsController");




router.get("/", gitFinesSettings);
router.put("/", updateFinesSettings);


module.exports = router;
