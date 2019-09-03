const fetch = require('node-fetch')
const express = require('express')
const router = express.Router()

//get glasses

router.get('/allGlasses', async (req,res)=>{
    try{
    const allCocktailGlasses = await fetch('https://the-cocktail-db.p.rapidapi.com/list.php?g=list',{
        headers:{
            "x-rapidapi-key":process.env.API_KEY
        }
    })
    const parsed = await allCocktailGlasses.json()
    console.log(parsed, '<--- glasses')
    res.json({glasses: parsed.drinks, success: true, message: "api cocktail glasses"})
    }catch(err){
        console.log(err)
        res.json({
            success:false,
            message: "something went wrong"
        })
    }
})

//get ingredients

router.get('/allIngredients', async(req,res)=>{
    try{
    const allCocktailIngredients = await fetch('https://the-cocktail-db.p.rapidapi.com/list.php?i=list',{
        headers:{
            "x-rapidapi-key":process.env.API_KEY
        }
    })

    const parsed = await allCocktailIngredients.json()
    console.log(parsed, '<--- ingredients')
    res.json({ingredients: parsed.drinks, success: true, message: "api cocktail ingredients"})

    }catch(err){
        console.log(err)
        res.json({
            success:false,
            message: "something went wrong"
        })
    }
})


// get catagories 

router.get('/allCatagories', async(req,res)=>{
    try{
    const allCocktailCatagories = await fetch('https://the-cocktail-db.p.rapidapi.com/list.php?c=list',{
        headers:{
            "x-rapidapi-key":process.env.API_KEY
        }
    })

    const parsed = await allCocktailCatagories.json()
    console.log(parsed, '<--- catagories')
    res.json({catagories: parsed.drinks, success: true, message: "api cocktail catagories"})

    }catch(err){
        console.log(err)
        res.json({
            success:false,
            message: "something went wrong"
        }) 
    }
})



module.exports = router