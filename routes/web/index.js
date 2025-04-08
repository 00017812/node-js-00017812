const express = require('express');
const vocabularyRouter = require('./vocabulary');

const router = express.Router();

// Add a root route that redirects to the vocabulary list
router.get('/', (req, res) => {
    res.redirect('/vocabulary');
});

// Use the vocabulary routes
router.use('/vocabulary', vocabularyRouter);

module.exports = router;