const fs = require('fs');
const path = require('path');
const User = require('../models/userModel');

const filePath = path.join(__dirname, '../data/users.json');

const readData = () => JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const writeData = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

const getUsers = (req, res) => {
  const users = readData();
  res.json(users);
};

const addUser = (req, res) => {
  const { name } = req.body;
  const users = readData();
  const newUser = new User(users.length + 1, name);
  users.push(newUser);
  writeData(users);
  res.status(201).json(newUser);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const users = readData();
  const userIndex = users.findIndex((user) => user.id === parseInt(id, 10));

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users[userIndex].name = name;
  writeData(users);
  res.json(users[userIndex]);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const users = readData();
  const userIndex = users.findIndex((user) => user.id === parseInt(id, 10));

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const [deletedUser] = users.splice(userIndex, 1);
  writeData(users);
  res.json(deletedUser);
};

const getUserPokemons = (req, res) => {
  const { id } = req.params;
  const users = readData();
  const user = users.find(user => user.id === parseInt(id, 10));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const pokemons = user.pokemons || []; 
  res.json(pokemons);
};

const addPokemonToUser = (req, res) => {
  const { userId, pokemon } = req.body;
  const users = readData();
  const user = users.find(user => user.id === parseInt(userId, 10));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (!user.pokemons) {
    user.pokemons = [];
  }

  user.pokemons.push(pokemon);
  writeData(users);
  res.status(201).json(user.pokemons);
};

module.exports = { getUsers, addUser, updateUser, deleteUser, getUserPokemons, addPokemonToUser };
