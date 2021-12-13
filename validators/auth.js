import { check, validationResult } from 'express-validator';

const validateLogin = [
  check('password')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Password is required!')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Minimum 8 characters required!')
    .bail(),
  check('email')
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage('Invalid email address!')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

export { validateLogin }