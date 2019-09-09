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
            "x-rapidapi-key": process.env.API_KEY
        }
    })
    const parsed = await allCocktailIngredients.json()
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
    res.json({catagories: parsed.drinks, success: true, message: "api cocktail catagories"})

    }catch(err){
        console.log(err)
        res.json({
            success:false,
            message: "something went wrong"
        }) 
    }
})

//random drink
router.get('/randomDrink', async(req,res) =>{
    try{
        const randomCocktail = await fetch('https://the-cocktail-db.p.rapidapi.com/random.php',{
        headers:{
            "x-rapidapi-key":process.env.API_KEY
        }
    })

    const parsed = await randomCocktail.json()
    res.json({random: parsed.drinks, success: true, message: "api cocktail random"})

    }catch(err){
        console.log(err)
        res.json({
            success:false,
            message: "something went wrong"
        }) 
    }
})



module.exports = router