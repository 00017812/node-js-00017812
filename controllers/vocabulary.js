const { validationResult } = require('express-validator');
const vocabularyService = require('../service/vocabulary');

const vocabularyController = {

  getById: (req, res) => {
    try {
      const vocabulary = vocabularyService.getById(req, res);
      res.render('vocabulary/create_update', { vocabulary })
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAll: (req, res) => {
    try {
      const vocabularies = vocabularyService.get(req, res);
      res.render('vocabulary/index', { vocabularies })
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('vocabulary/create_update', { errors: errors.array(), vocabulary: req.body });
    }
    try {
      await vocabularyService.insert(req, res);
      res.redirect('/vocabulary');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('vocabulary/create_update', { errors: errors.array(), vocabulary: req.body });
    }
    try {
      const updatedVocabulary = vocabularyService.update(req, res);
      if (!updatedVocabulary) {
        return res.status(404).json({ error: 'Vocabulary not found' });
      }
      res.redirect('/vocabulary');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: (req, res) => {
    try {
      const deleted = vocabularyService.delete(req, res);
      if (!deleted) {
        return res.status(404).json({ error: 'Vocabulary not found' });
      }
      res.redirect('/vocabulary');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = vocabularyController;
