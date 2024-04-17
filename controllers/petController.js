const asynchandler = require('express-async-handler');
const Pet = require('../models/pet');

//CREATE
exports.pet_create_get = asynchandler(async (req, res) => {
  res.send('NOT IMPLEMENTED: Pet Create Get');
});

exports.pet_create_post = asynchandler(async (req, res) => {
  res.send('NOT IMPLEMENTED: Pet Create Post');
});

//READ

exports.pet_list = asynchandler(async (req, res) => {
  const allPets = await Pet.find().exec();
  res.render('pet_list', {
    title: 'List of Pets',
    pet_list: allPets,
  });
});

//UPDATE
exports.pet_update_get = asynchandler(async (req, res) => {
  res.send(`NOT IMPLEMENTED: Pet Update GET ${req.params.id}`);
});

exports.pet_update_post = asynchandler(async (req, res) => {
  res.send(`NOT IMPLEMENTED: Pet Update POST ${req.params.id}`);
});

//DELETE
exports.pet_delete_get = asynchandler(async (req, res) => {
  res.send(`NOT IMPLEMENTED: Pet Delete GET ${req.params.id}`);
});

exports.pet_delete_post = asynchandler(async (req, res) => {
  res.send(`NOT IMPLEMENTED: Pet Delete POST ${req.params.id}`);
});
