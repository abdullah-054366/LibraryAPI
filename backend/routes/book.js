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

const {
  authMiddleware

} = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: "public/imgs/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });


const {
  checkPermission
} = require('../middleware/checkPermission ');


router.get("/", getListBooks);
router.get("/book-copie-tatus", updateBookCopieStatus);
router.get("/:id", getBookById);

// router.post("/", checkPermission("create_books"), upload.single("image"), createBook);
// router.put("/:id", checkPermission("update_books"), upload.single("image"), updateBook);
// router.delete("/:id", checkPermission("delete_books"), deleteBook);


router.post("/" , upload.single("image"), createBook);
router.put("/:id", upload.single("image"), updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
