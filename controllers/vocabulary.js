const { validationResult } = require('express-validator');
const vocabularyService = require('../service/vocabulary');


const vocabularyController = {
  getById: async (req, res) => {
    try {
      const vocabulary = await vocabularyService.getById(req.params.id); // Await the service method
      if (!vocabulary) {
        return res.status(404).json({ error: 'Vocabulary not found' });
      }
      res.render('vocabulary/create_update', { vocabulary });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const vocabularies = await vocabularyService.get(); // Await the service method
      res.render('vocabulary/index', { vocabularies });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('vocabulary/create_update', { errors: errors.array(), vocabulary: req.body });
    }
    try {
      const newVocabulary = await vocabularyService.insert(req, res);
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
      const updatedVocabulary = await vocabularyService.update(req, res);
      if (!updatedVocabulary) {
        return res.status(404).json({ error: 'Vocabulary not found' });
      }
      res.redirect('/vocabulary');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
},

  delete: async (req, res) => {
    try {
      const deleted = await vocabularyService.delete(req.params.id); // Await the service method
      if (!deleted) {
        return res.status(404).json({ error: 'Vocabulary not found' });
      }
      res.redirect('/vocabulary');
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = vocabularyController;