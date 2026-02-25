const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const {
  validateLogin,
  validateRegister
} = require('../middleware/validation');

// Auth routes
router.post('/login', ...validateLogin, authController.login);
router.post('/register', ...validateRegister, authController.register);
router.get('/verify', (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      username: 'test',
      email: 'test@test.com',
      role: 'user'
    }
  });
});

module.exports = router;
