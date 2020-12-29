const { body, validationResult } = require('express-validator');

const todoValidator = [
  body('task')
    .isLength({ min: 1 })
    .withMessage(
      'Task should not be empty',
    ),
  function todoValidation(req, res, next) {
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
export default todoValidator;
