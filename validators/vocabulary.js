const { body } = require('express-validator');

const vocabularyValidationRules = () => { 
  return [
    body('words')
      .notEmpty().withMessage('words must not be empty'),
    body('translation')
      .notEmpty().withMessage('translation must not be empty'),
    body('dateofadding')
      .notEmpty().withMessage('dateofadding must not be empty')
  ];
};

module.exports = {
    vocabularyValidationRules
};
