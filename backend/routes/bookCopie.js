
const express = require("express");
const router = express.Router();

const {
    getListBookCopies,
    getBookCopieById,
    createBookCopies,
    updateBookCopie,
    deleteBookCopie,
    updateBookCopieStatus,
  
} = require("../controllers/BooksCopiesController");




router.get("/", getListBookCopies);
router.get("/:id", getBookCopieById);
router.post("/", createBookCopies);
router.put("/status/:copieId", updateBookCopieStatus);
router.put("/:id", updateBookCopie);
router.delete("/:id", deleteBookCopie);






module.exports = router;