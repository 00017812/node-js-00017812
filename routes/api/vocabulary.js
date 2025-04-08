const express = require('express');
const { vocabularyValidationRules } = require('../../validators/vocabulary');
const vocabularyController = require('../../controllers/vocabulary');
const router = express.Router();

router.post('/create', vocabularyValidationRules(), vocabularyController.create);
router.post('/update/:id', vocabularyValidationRules(), vocabularyController.update);
router.delete('/delete/:id', vocabularyController.delete);


module.exports = router;