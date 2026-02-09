const { body, validationResult } = require('express-validator');

exports.validateTask = [
  body('title').notEmpty().withMessage('Title is required'),

  body('priority')
    .optional()
    .toLowerCase()
    .isIn(['low', 'medium', 'high']),

  body('status')
    .optional()
    .toLowerCase()
    .isIn(['todo', 'in-progress', 'done']),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
