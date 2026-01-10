const express = require("express");
const router = express.Router();
const {

    getAllReturnBooks,
    createReturnBook,
    getReturnBookById,
    updateReturnBook,
    deleteReturnBook
} = require("../controllers/ReturnBookController");


router.get("/", getAllReturnBooks)

router.get("/:id", getReturnBookById)

router.post("/", createReturnBook)

router.put("/:id", updateReturnBook)

router.delete("/:id", deleteReturnBook)



module.exports = router;