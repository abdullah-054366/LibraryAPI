const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");

const axios = require("axios");



// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();




        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ Message: error });
    }
}
);

// Get user by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id
        );

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ Message: error });
    }
}
);

// Create a new user
router.post("/", async (req, res) => {
    try {
        const { name, email, password, phone, libraryCardNumber } = req.body;
        if (!name || !email || !password || !phone  || !libraryCardNumber) {
            return res.status(400).json({ message: "الرجاء تعبئة جميع الحقول المطلوبة." });
        }
        const newUser = {
            name: name.trim(),
            email: email.trim(),
            password,
            phone: phone.trim() ,
            libraryCardNumber: libraryCardNumber.trim(),
        };
        await User.create(newUser);
   
        res.status(201).json({ message: "تم إنشاء المستخدم بنجاح!" });
    } catch (error) {
        res.status(400).json({ Message: error });
    }
}
);

// Update user by ID
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, phone, libraryCardNumber } = req.body;
        const updatedUser = {
            name: name.trim(),
            email: email.trim(),
            password,
            phone: phone ? phone.trim() : undefined,
            libraryCardNumber: libraryCardNumber.trim(),
        };

        await User.findByIdAndUpdate(id, updatedUser);
        res.status(200).json('تم التعديل بنجاح');
    } catch (error) {
        res.status(400).json({ Message: error });
    }
}
);

// Delete user by ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "تم حذف المستخدم بنجاح!" });
    } catch (error) {
        res.status(400).json({ Message: error });
    }
}
);



module.exports = router;