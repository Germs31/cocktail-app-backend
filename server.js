const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors')


const app = express();

const PORT = process.env.PORT

const cocktailRouter = require('./controller/cocktail.js')
const authRouter = require('./controller/auth.js')
const userRouter = require('./controller/user.js')


require('./db/db');
require('dotenv').config()

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json())
app.use(session({
    secret: 'muckduck',
    resave: false,
    saveUninitialized: false
}));

//WHEN DEPLOYED, ADD YOUR DEPLOYED URL ADDRESS TO ORIGIN ARRAY
const corsOptions = {
    origin: ['http://localhost:3001'],
    credentials: true,
    optionsSuccessStatus: 200
}

// app.use(cors());
app.use(cors(corsOptions))


app.use('/cocktail', cocktailRouter)
app.use('/auth', authRouter)
app.use('/user', userRouter)


app.listen(PORT, (err) => {
    console.log(err || `server listening on ${PORT}`)
})