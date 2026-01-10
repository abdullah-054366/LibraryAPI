const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const {
    getListBooks,
    createBook,
    getBookById,
    updateBook,
    deleteBook,
    updateBookCopieStatus
} = require("../controllers/BooksController");


const storage = multer.diskStorage({
  destination: "public/imgs/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.get("/", getListBooks);
router.get("/book-copie-tatus", updateBookCopieStatus);
router.get("/:id", getBookById);
router.post("/", upload.single("image"), createBook);
router.put("/:id", upload.single("image"), updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
