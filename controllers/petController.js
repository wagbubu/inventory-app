const asynchandler = require('express-async-handler');
const Pet = require('../models/pet');
const Item = require('../models/item');
const { body, validationResult } = require('express-validator');

//CREATE
exports.pet_create_get = asynchandler(async (req, res) => {
  res.render('pet_form', {
    title: 'Add new pet',
  });
});

exports.pet_create_post = [
  body('name', 'Pet name most contain atleast 2 characters')
    .trim()
    .isLength({ min: 2 })
    .escape(),
  asynchandler(async (req, res) => {
    const errors = validationResult(req);

    const pet = new Pet({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render('pet_form', {
        title: 'Add new pet',
        pet: pet,
        errors: errors.array(),
      });
      return;
    } else {
      const petExists = await Pet.findOne({ name: req.body.name }).exec();
      if (petExists) {
        res.redirect('/inventory/pets');
      } else {
        await pet.save();
        res.redirect('/inventory/pets');
      }
    }
  }),
];

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
  const pet = await Pet.findById(req.params.id).exec();
  res.render('pet_form', {
    title: 'Update pet',
    pet: pet,
  });
});

exports.pet_update_post = [
  body('name', 'Pet must not be empty').trim().escape(),
  asynchandler(async (req, res) => {
    const errors = validationResult(req);
    const pet = new Pet({
      _id: req.params.id,
      name: req.body.name,
    });
    if (!errors.isEmpty()) {
      res.render('pet_form', {
        title: 'Update pet',
        pet: pet,
        errors: errors.array(),
      });
      return;
    } else {
      await Pet.findByIdAndUpdate(req.params.id, pet, {});
      res.redirect('/inventory/pets');
    }
  }),
];

//DELETE
exports.pet_delete_get = asynchandler(async (req, res) => {
  const pet = await Pet.findById(req.params.id).exec();
  const allItems = await Item.find({ pet: req.params.id }).exec();

  res.render('pet_delete', {
    title: 'Delete Pet',
    pet: pet,
    item_list: allItems,
  });
});

exports.pet_delete_post = asynchandler(async (req, res) => {
  await Pet.findByIdAndDelete(req.params.id);
  res.redirect('/inventory/pets');
});
