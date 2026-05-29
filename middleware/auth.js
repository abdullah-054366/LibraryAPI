const jtp = require('jsonwebtoken');
const users = require("../models/userSchema");
const bcrypt = require("bcryptjs");

function authMiddleware(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "لا يوجد توكن" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "SECRET_KEY");
        req.user = decoded; // 👈 نخزن المستخدم
        next();
    } catch (error) {
        return res.status(401).json({ message: "توكن غير صالح" });
    }

}


 async function register (req, res){
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "جميع الحقول مطلوبة" });
        }

        const userExists = users.find(u => u.email === email);

        if (userExists) {
            return res.status(400).json({ message: "المستخدم موجود مسبقًا" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
       
            name,
            email,
            password: hashedPassword,
            permissions: ["create_books"] // مثال
        };

         

        res.status(201).json({ message: "تم إنشاء الحساب بنجاح" });

    } catch (error) {
        res.status(500).json({ message: "خطأ في السيرفر" });
    }
};


module.exports =
{
    authMiddleware
};