const express = require('express');
const app = express();
const PORT = 3000
const cocktailRouter = require('./controller/cocktail.js')
require('./db/db');
require('dotenv').config()

app.use('/cocktail', cocktailRouter)


app.listen(PORT, (err) => {
    console.log(err || `server listening on ${PORT}`)
})