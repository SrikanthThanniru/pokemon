const fs = require('fs');
const path = require('path');
const Pokemon = require('../models/pokemonModel');

const userFilePath = path.join(__dirname, '../data/users.json');

const readData = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const writeData = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

const getPokemons = (req, res) => {
  const users = readData(userFilePath);
  const pokemons = users.flatMap((user) => user.pokemons);
  res.json(pokemons);
};

const addPokemon = (req, res) => {
  const { ownerName, name, ability, positionX, positionY, speed, direction } = req.body;
  const users = readData(userFilePath);

  if (users.length === 0) {
    return res.status(404).json({ message: 'No users found' });
  }

  let user = users.find(user => user.name === ownerName);
  if (!user) {
    user = { id: users.length + 1, name: ownerName, pokemons: [] };
    users.push(user);
  }

  const newPokemon = new Pokemon(
    user.pokemons.length + 1,
    ownerName,
    name,
    ability,
    positionX,
    positionY,
    speed,
    direction
  );

  user.pokemons.push(newPokemon);
  writeData(userFilePath, users);
  res.status(201).json(newPokemon);
};

const getOwnerPokemons = (req, res) => {
  const { ownerName } = req.params;
  const users = readData(userFilePath);
  const owner = users.find(user => user.name === ownerName);

  if (!owner) {
    return res.status(404).json({ message: 'Owner not found' });
  }

  res.json(owner.pokemons);
};

const updatePokemon = (req, res) => {
  const { id } = req.params;
  const { name, ability, positionX, positionY, speed, direction } = req.body;
  const users = readData(userFilePath);
  let foundPokemon;

  users.forEach((user) => {
    const pokemon = user.pokemons.find((p) => p.id === parseInt(id, 10));
    if (pokemon) {
      pokemon.name = name;
      pokemon.ability = ability;
      pokemon.positionX = positionX;
      pokemon.positionY = positionY;
      pokemon.speed = speed;
      pokemon.direction = direction;
      foundPokemon = pokemon;
    }
  });

  if (!foundPokemon) {
    return res.status(404).json({ message: 'Pokemon not found' });
  }

  writeData(userFilePath, users);
  res.json(foundPokemon);
};

const deletePokemon = (req, res) => {
  const { id } = req.params;
  const users = readData(userFilePath);
  let deletedPokemon;

  users.forEach((user) => {
    const pokemonIndex = user.pokemons.findIndex((p) => p.id === parseInt(id, 10));
    if (pokemonIndex !== -1) {
      [deletedPokemon] = user.pokemons.splice(pokemonIndex, 1);
    }
  });

  if (!deletedPokemon) {
    return res.status(404).json({ message: 'Pokemon not found' });
  }

  writeData(userFilePath, users);
  res.json(deletedPokemon);
};

const getOwnerNames = (req, res) => {
  const users = readData(userFilePath);
  const ownerNames = [...new Set(users.map(user => user.name))];
  res.json(ownerNames);
};

module.exports = { getPokemons, addPokemon, updatePokemon, deletePokemon, getOwnerNames, getOwnerPokemons };
