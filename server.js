const express = require('express');
const app = express();
const PORT = 3000

require('./db/db');



app.listen(PORT, (err) => {
    console.log(err || `server listening on ${PORT}`)
})