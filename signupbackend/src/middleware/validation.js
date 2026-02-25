const { body, param, query, header, validationResult } = require('express-validator');
const User = require('../models/User');

/* ==========================
   Gestion des erreurs
========================== */
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array().forEach(err => {
      console.log(`Field: ${err.param}, Error: ${err.msg}`);
    });

    return res.status(400).json({
      success: false,
      message: 'Erreur de validation',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg,
        value: err.value,
        location: err.location
      }))
    });
  }

  next();
};

/* ==========================
   Login
========================== */
const validateLogin = [
  body('email')
    .notEmpty().withMessage('Email requis')
    .isEmail().withMessage('Email invalide'),

  body('password')
    .notEmpty().withMessage('Mot de passe requis')
    .isLength({ min: 6 }).withMessage('Minimum 6 caractères'),

  validate
];

/* ==========================
   Register
========================== */
const validateRegister = [
  body('username')
    .notEmpty().withMessage('Username requis')
    .isLength({ min: 3 }).withMessage('Minimum 3 caractères')
    .custom(async value => {
      const user = await User.findOne({ username: value });
      if (user) throw new Error('Username déjà utilisé');
      return true;
    }),

  body('email')
    .notEmpty().withMessage('Email requis')
    .isEmail().withMessage('Email invalide')
    .custom(async value => {
      const user = await User.findOne({ email: value });
    if (user) throw new Error('Email déjà utilisé');
      return true;
    }),

  body('password')
      .notEmpty().withMessage('Mot de passe requis')
    .isLength({ min: 8 }).withMessage('Minimum 8 caractères'),
  validate
];

/* ==========================
   Forgot / Reset
========================== */
const validateForgotPassword = [
  body('email').isEmail().withMessage('Email invalide'),
  validate
];

const validateResetPassword = [
  body('token').notEmpty().withMessage('Token requis'),

  body('newPassword')
    .isLength({ min: 8 }).withMessage('Minimum 8 caractères'),

  body('confirmPassword')
    .custom((v, { req }) => v === req.body.newPassword)
    .withMessage('Les mots de passe ne correspondent pas'),

  validate
];

/* ==========================
   Change password
========================== */
const validateChangePassword = [
  body('currentPassword').notEmpty().withMessage('Mot de passe actuel requis'),
  body('newPassword')
    .isLength({ min: 8 }).withMessage('Minimum 8 caractères'),
  validate
];

/* ==========================
   Utils
========================== */
const validateObjectId = [
  param('id').isMongoId().withMessage('ID invalide'),
  validate
];

const validatePagination = [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  validate
];

module.exports = {
  validateLogin,
  validateRegister,
  validateForgotPassword,
  validateResetPassword,
  validateChangePassword,
  validateObjectId,
  validatePagination
};
