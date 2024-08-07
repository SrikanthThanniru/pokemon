const express = require('express');
const { getPokemons, addPokemon, updatePokemon, deletePokemon, getOwnerNames, getOwnerPokemons } = require('../controllers/pokemonController');

const router = express.Router();

router.get('/', getPokemons);
router.post('/', addPokemon);
router.put('/:id', updatePokemon);
router.delete('/:id', deletePokemon);
router.get('/owners', getOwnerNames);
router.get('/owners/:ownerName/pokemons', getOwnerPokemons);

module.exports = router;
