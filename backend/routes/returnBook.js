const express = require("express");
const router = express.Router();
const {

    getAllReturnBooks,
    createReturnBook,
    getReturnBookById,
    updateReturnBook,
    deleteReturnBook,
    updatePayFineStatus
} = require("../controllers/ReturnBookController");


router.get("/", getAllReturnBooks)

router.get("/:id", getReturnBookById)

router.post("/", createReturnBook)

router.put("/:id", updateReturnBook)
router.put("/status/:id", updatePayFineStatus)

router.delete("/:id", deleteReturnBook)



module.exports = router;