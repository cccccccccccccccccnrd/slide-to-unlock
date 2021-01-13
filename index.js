const path = require('path')
const express = require('express')

const app = express()

app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(2333)
console.log('Slide to Unlock (2007-) listening on http://localhost:2333')