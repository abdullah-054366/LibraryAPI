const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require('./config/db/db.js');

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));



const bookRouter = require('./routes/book');
const userRouter = require('./routes/user');
const borrowingRouter = require('./routes/borrowing');
const bookCopieRouter = require('./routes/bookCopie');
const reservationRouter = require('./routes/reservation');
const returnBookRouter = require('./routes/returnBook');




app.use('/api/books',bookRouter);
app.use('/api/users',userRouter);
app.use('/api/borrowings',borrowingRouter);
app.use('/api/books-copie',bookCopieRouter);
app.use('/api/reservations',reservationRouter);
app.use('/api/return-books',returnBookRouter);





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
