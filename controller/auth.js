const express = require('express')
const router = express.Router()
const User    = require('../models/users')
const bcrypt  = require('bcryptjs')

router.post('/login', async (req,res)=>{
    try{
        const foundUser = await User.findOne({username: req.body.username});
        // console.log(foundUser)
        if(foundUser){
            if(bcrypt.compareSync(req.body.password, foundUser.password)){
                req.session.userId = foundUser._id;
                req.session.username = foundUser.username;
                req.session.logged = true;
                // console.log(req.session)
                res.json({foundUser})
                
            }else {
                req.session.message = 'Username or Password incorrect';
            }

        }else{

            req.session.message = 'Username or Password incorrect';
            res.redirect('/');

        }

    }catch(err){
        console.log(err)
        res.send(err);
    }
})

router.post('/register', async (req,res) =>{

    const password = req.body.password;

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    // console.log(hashedPassword)
    req.body.password = hashedPassword;

    try{
        // console.log(req.body)
        const createdUser = await User.create(req.body);
        // console.log(createdUser, '<--- created user');
        req.session.userId = createdUser._id;
        req.session.username = createdUser.username;
        req.session.logged = true;

        res.json({data:createdUser})

    }catch(err){

        console.log(err)
        res.send(err)

    }
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if(err){
        res.send(err);
      } else {
        // console.log(req.session, '<--- logged out')
        res.json({"isLogged": true});
      }
    })
  
  })


module.exports = router;
