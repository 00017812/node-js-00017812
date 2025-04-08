const { body } = require('express-validator');

const vocabularyValidationRules = () => { 
  return [
    body('word') 
      .notEmpty().withMessage('Word must not be empty'),
    body('translation')
      .notEmpty().withMessage('Translation must not be empty'),
    body('image') 
      .notEmpty().withMessage('Image URL must not be empty'),
    body('dateAdded') 
      .notEmpty().withMessage('Date Added must not be empty')
  ];
};

module.exports = {
    vocabularyValidationRules
};