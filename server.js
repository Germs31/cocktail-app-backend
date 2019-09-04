const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors')



const PORT = 3000

const cocktailRouter = require('./controller/cocktail.js')
const authRouter = require('./controller/auth.js')
const userRouter = require('./controller/user.js')


require('./db/db');
require('dotenv').config()

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    secret: 'muckduck',
    resave: false,
    saveUninitialized: false
}));



app.use(cors());

app.use('/cocktail', cocktailRouter)
app.use('/auth', authRouter)
app.use('/user', userRouter)


app.listen(PORT, (err) => {
    console.log(err || `server listening on ${PORT}`)
})