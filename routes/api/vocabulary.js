const express = require('express');
const { vocabularyValidationRules } = require('../../validators/vocabulary');
const vocabularyController = require('../../controllers/vocabulary');
const router = express.Router();

router.post('/create', vocabularyValidationRules(), vocabularyController.create);
router.post('/update/:id', vocabularyValidationRules(), vocabularyController.update);
router.get('/delete/:id', vocabularyValidationRules(), vocabularyController.delete);

module.exports = router;