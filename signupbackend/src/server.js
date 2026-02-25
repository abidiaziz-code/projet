const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dashboardRoutes = require('./routes/dashboardRoutes');
require('dotenv').config();

// استيراد المسارات
const authRoutes = require('./routes/authRoutes');

// تهيئة التطبيق
const app = express();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// المسارات
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);


// معالج الأخطاء
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'حدث خطأ في الخادم'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`الخادم يعمل على المنفذ ${PORT}`);
});