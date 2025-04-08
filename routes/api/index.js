const express = require('express')
const vocabularyRouter = require('./vocabulary')

const router = express.Router()

router.use('/vocabulary', vocabularyRouter)

module.exports = router