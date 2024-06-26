const asynchandler = require('express-async-handler');
const Item = require('../models/item');
const Pet = require('../models/pet');
const Category = require('../models/category');
const { body, validationResult } = require('express-validator');

//CREATE
exports.item_create_get = asynchandler(async (req, res) => {
  const allPets = await Pet.find().exec();
  const allCategory = await Category.find().exec();

  res.render('item_form', {
    title: 'Add new item',
    categories: allCategory,
    pets: allPets,
  });
});

exports.item_create_post = [
  body('name', 'Name must contain atleast 2 characters')
    .trim()
    .isLength({ min: 2 })
    .escape(),
  body('description', 'Description must contain atleast 5 characters')
    .trim()
    .isLength({ min: 5 })
    .escape(),
  body('category', 'Category must contain atleast 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('pet', 'Pet must contain atleast 2 characters')
    .trim()
    .isLength({ min: 2 })
    .escape(),
  body('price')
    .trim()
    .custom((value) => {
      if (Number(value) < 0) {
        throw new Error('Price must be greater than zero');
      }
      return true;
    })
    .escape(),
  body('number_in_stock')
    .trim()
    .custom((value) => {
      if (Number(value) < 0) {
        throw new Error('Quantity must be greater than zero');
      }
      return true;
    })
    .escape(),

  asynchandler(async (req, res) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: Number(req.body.price),
      number_in_stock: Number(req.body.number_in_stock),
      pet: req.body.pet,
    });

    if (!errors.isEmpty()) {
      const [allPets, allCategory] = await Promise.all([
        Pet.find().exec(),
        Category.find().exec(),
      ]);

      res.render('item_form', {
        title: 'Add new Item',
        item: item,
        pets: allPets,
        categories: allCategory,
        errors: errors.array(),
      });
      return;
    } else {
      await item.save();
      res.redirect(item.url);
    }
  }),
];

exports.item_detail = asynchandler(async (req, res, next) => {
  const itemDetail = await Item.findById(req.params.id).exec();
  if (itemDetail === null) {
    const err = new Error('Item not found!');
    err.status = 404;
    return next(err);
  }
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
exports.item_update_get = asynchandler(async (req, res, next) => {
  const [allPets, allCategory, item] = await Promise.all([
    await Pet.find().exec(),
    await Category.find().exec(),
    await Item.findById(req.params.id).exec(),
  ]);

  if (item === null) {
    // No results.
    const err = new Error('Item not found');
    err.status = 404;
    return next(err);
  }

  allPets.forEach((pet) => {
    if (item.pet == pet._id.toString()) {
      pet.checked = true;
    }
  });

  allCategory.forEach((category) => {
    if (item.category == category._id.toString()) {
      category.checked = true;
    }
  });

  res.render('item_form', {
    title: 'Update item',
    categories: allCategory,
    pets: allPets,
    item: item,
  });
});

exports.item_update_post = [
  body('name', 'Name must contain atleast 2 characters')
    .trim()
    .isLength({ min: 2 })
    .escape(),
  body('description').trim().isLength({ min: 1 }).escape(),
  body('category').trim().isLength({ min: 1 }).escape(),
  body('pet').trim().isLength({ min: 1 }).escape(),
  body('price')
    .trim()
    .custom((value) => {
      if (Number(value) < 0) {
        throw new Error('Value must be greater than zero');
      }
      return true;
    })
    .escape(),
  body('number_in_stock')
    .trim()
    .custom((value) => {
      if (Number(value) < 0) {
        throw new Error('Value must be greater than zero');
      }
      return true;
    })
    .escape(),
  asynchandler(async (req, res) => {
    const errors = validationResult(req);
    const item = new Item({
      _id: req.params.id,
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
      pet: req.body.pet,
    });

    if (!errors.isEmpty()) {
      const allPets = await Pet.find().exec();
      const allCategory = await Category.find().exec();
      const item = await Item.findOne({ _id: req.params.id }).exec();

      allPets.forEach((pet) => {
        if (item.pet == pet._id.toString()) {
          pet.checked = true;
        }
      });

      allCategory.forEach((category) => {
        if (item.category == category._id.toString()) {
          category.checked = true;
        }
      });

      res.render('item_form', {
        title: 'Update item',
        categories: allCategory,
        pets: allPets,
        item: item,
        errors: errors.array(),
      });
      return;
    } else {
      await Item.findByIdAndUpdate(req.params.id, item, {}).exec();
      res.redirect(item.url);
    }
  }),
];

//DELETE
exports.item_delete_get = asynchandler(async (req, res) => {
  const item = await Item.findById(req.params.id).exec();
  if (item === null) {
    res.redirect('/inventory/');
  }
  res.render('item_delete', {
    title: `Delete Item ID: ${item._id}`,
    item: item,
  });
});

exports.item_delete_post = asynchandler(async (req, res) => {
  await Item.findByIdAndDelete(req.params.id).exec();
  res.redirect('/inventory/');
});
