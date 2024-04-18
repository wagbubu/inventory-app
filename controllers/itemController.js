const asynchandler = require('express-async-handler');
const Item = require('../models/item');
const Pet = require('../models/pet');
const Category = require('../models/category');

//CREATE
exports.item_create_get = [
  asynchandler(async (req, res) => {
    const allPets = await Pet.find().exec();
    const allCategory = await Category.find().exec();

    res.render('item_form', {
      title: 'Create new Item',
      categories: allCategory,
      pets: allPets,
    });
  }),
];

exports.item_create_post = asynchandler(async (req, res) => {
  res.send('NOT IMPLEMENTED: Item Create Post');
});

exports.item_detail = asynchandler(async (req, res) => {
  const itemDetail = await Item.findById(req.params.id).exec();
  res.render('item_detail', {
    title: 'Item Detail',
    item: itemDetail,
    page: 'Item Detail',
  });
});

exports.item_list = asynchandler(async (req, res, next) => {
  //if my query fetch all items with that query
  const allPets = await Pet.find().exec();
  const allCategory = await Category.find().exec();
  if (Object.keys(req.query).length !== 0) {
    let filteredItems = await Item.find(req.query).exec();
    //remember checked pets
    if (req.query.pet) {
      allPets.forEach((pet) => {
        if (req.query.pet.includes(pet._id.toString())) {
          pet.checked = true;
        }
      });
    }
    //remember checked categories
    if (req.query.category) {
      allCategory.forEach((category) => {
        if (req.query.category.includes(category._id.toString())) {
          category.checked = true;
        }
      });
    }

    res.render('item_list', {
      title: 'Filtered Items',
      page: 'Filter Results',
      item_list: filteredItems,
      pets: allPets,
      categories: allCategory,
    });
  } else {
    const allItems = await Item.find().exec();
    res.render('item_list', {
      title: 'Item list',
      page: 'Home',
      item_list: allItems,
      pets: allPets,
      categories: allCategory,
    });
  }
});

//UPDATE
exports.item_update_get = asynchandler(async (req, res) => {
  res.send('NOT IMPLEMENTED: Item Update Get');
});

exports.item_update_post = asynchandler(async (req, res) => {
  res.send('NOT IMPLEMENTED: Item Update Post');
});

//DELETE
exports.item_delete_get = asynchandler(async (req, res) => {
  res.send('NOT IMPLEMENTED: Item Delete Get');
});

exports.item_delete_post = asynchandler(async (req, res) => {
  res.send('NOT IMPLEMENTED: Item Delete Post');
});
