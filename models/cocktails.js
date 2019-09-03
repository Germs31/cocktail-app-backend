const mongoose = require('mongoose');


const cocktailSchema = new mongoose.Schema({
    name: { type: String, required: true},
    alcohol: { type: String, required: true},
    ingredients: { type: String, required: true},
    created_by: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

});

const Cocktail = mongoose.model('Cocktail', cocktailSchema);

module.exports = Cocktail;