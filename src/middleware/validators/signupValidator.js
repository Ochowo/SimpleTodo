const { body, validationResult } = require('express-validator');

const signUpValidator = [
  body('firstName')
    .isLength({ min: 2 })
    .withMessage(
      'firstName should not be empty and should be atleast 3 characters',
    )
    .isAlpha()
    .withMessage('firstName should be an alpabeth')
    .trim(),
  body('lastName')
    .isAlpha()
    .withMessage('lastName should be an alphabeth')
    .isLength({ min: 2 })
    .withMessage(
      'lastName should not be empty and should be atleast three characters',
    ),
  body('email')
    .isEmail()
    .withMessage('email should not be empty and should be a valid email')
    .normalizeEmail(),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage(
      'password should not be empty and should be at least 6 characters',
    ),
  function signUpValidation(req, res, next) {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 422,
        error: errorValidation.array(),
      });
    }
    return next();
  },
];
export default signUpValidator;
