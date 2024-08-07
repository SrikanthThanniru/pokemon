const express = require('express');
const { getUsers, addUser, updateUser, deleteUser, getUserPokemons, addPokemonToUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', getUsers);
router.post('/', addUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id/pokemons', getUserPokemons); 
router.post('/:id/pokemons', addPokemonToUser); 

module.exports = router;
