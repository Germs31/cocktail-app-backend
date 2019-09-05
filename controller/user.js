const express = require('express')
const router = express.Router()
const bcrypt  = require('bcryptjs')
const User    = require('../models/users')


router.put('/:id', async (req,res)=>{

    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    req.body.password = hashedPassword;

    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})

        req.session.userId = updateUser._id;
        req.session.username = updateUser.username;
        req.session.logged = true;

        console.log(updateUser)

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





module.exports = router