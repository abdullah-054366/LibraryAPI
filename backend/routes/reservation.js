const express = require("express");
const router = express.Router();


const {
    getReservationsList,
    getReservationById,
    createReservation,
    updateReservation,
    deleteeservation
} = require("../controllers/ReservationController");






router.get("/", getReservationsList);
router.get("/:id", getReservationById);
router.post("/", createReservation);
router.put("/:id",updateReservation);
router.delete("/:id", deleteeservation);

module.exports = router;









module.exports = router;