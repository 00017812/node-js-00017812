const express = require('express')
const path = require('path')
const app = expres()

const port = 3000

global.mock_db = path.join(__dirname, './data/mock_db.json')

app.listen(port, () => {
    console.log(`Server ruinning at http://localhost:${port}/`)
})