const express = require('express');
const vocabularyController = require('../../controllers/vocabulary');
const router = express.Router();

router.get('/', (req, res)=>{
    vocabularyController.getAll(req, res)
});

router.get('/create', (req, res)=>{
    res.render('vocabulary/create_update')
});

router.get('/update/:id', (req, res)=>{
    vocabularyController.getById(req, res)
});

module.exports = router;