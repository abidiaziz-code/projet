const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// توليد JWT Token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// تسجيل الدخول
exports.login = async (req, res) => {
  try {
    // التحقق من صحة البيانات
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // البحث عن المستخدم
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'بيانات الدخول غير صحيحة'
      });
    }

    // التحقق من كلمة المرور
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'بيانات الدخول غير صحيحة'
      });
    }

    // التحقق من حالة الحساب
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'الحساب معطل'
      });
    }

    // تحديث آخر دخول
    user.lastLogin = new Date();
    await user.save();

    // توليد التوكن
    const token = generateToken(user._id);

    // إرسال الاستجابة
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};

// التسجيل
exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    // التحقق من وجود المستخدم
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'البريد الإلكتروني أو اسم المستخدم موجود مسبقاً'
      });
    }

    // إنشاء مستخدم جديد
    const user = new User({
      username,
      email,
      password
    });

    await user.save();

    // توليد التوكن
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};

// التحقق من التوكن
exports.verifyToken = async (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
};

// تسجيل الخروج
exports.logout = async (req, res) => {
  // في حالة JWT، العميل هو من يتخلص من التوكن
  res.json({
    success: true,
    message: 'تم تسجيل الخروج بنجاح'
  });
};