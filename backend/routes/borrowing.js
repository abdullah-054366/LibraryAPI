const express = require("express");
const router = express.Router();
const {

    
    getListBorrowing,
    getBorrowingById,
    createBorrowing,
    updateBorrowing,
    deleteBorrowing
} = require("../controllers/BorrowingController");

// Get all Borrowings
router.get("/", getListBorrowing)

// Get Borrowing by ID
router.get("/:id", getBorrowingById)


// Create a new Borrowing
router.post("/", createBorrowing)

// Update Borrowing by ID
router.put("/:id", updateBorrowing)


// Delete Borrowing by ID
router.delete("/:id", deleteBorrowing)



module.exports = router;