const express = require('express')
const router = express.Router()
const bcrypt  = require('bcryptjs')
const User    = require('../models/users')

router.post('/:id', async (req,res) => {
    // console.log('hit', req.body)
    try {
        const foundUser = await User.findById(req.params.id)
        foundUser.cocktails.push(req.body)
        await foundUser.save()
        res.json(foundUser)
    } catch(err) {
        console.log(err)
    }
})

router.put('/:id', async (req,res)=>{
    const foundUser = await User.findById(req.params.id)
    if(!req.body.password === foundUser.password) {
        const password = req.body.password;
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        req.body.password = hashedPassword;
    }
    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        req.session.userId = updateUser._id;
        req.session.username = updateUser.username;
        req.session.logged = true;
        res.json({
            status:{
                "code": 200,
                "message": true
            },
            data: updateUser
        })
    }catch(err){
        res.send(err)
    }
})

router.get('/:id', async (req,res)=>{
    try{
        const foundUser = await User.findById(req.params.id)
        res.json({
            data: foundUser
        })
    }catch(err){
        console.log(err)
    }
})

router.delete('/:id', async (req, res) => {

    try {
       const deletedUser = await User.findByIdAndRemove(req.params.id);
    //    console.log(deletedUser, '<--- deleted ')
        res.json({
          status:  {
              code: 200,
              message: true
            }
        });
    } catch(err){
      console.log(err);
    }
  });
  





module.exports = router