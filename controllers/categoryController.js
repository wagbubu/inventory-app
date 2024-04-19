const Category = require('../models/category');
const { body, validationResult } = require('express-validator');
const asynchandler = require('express-async-handler');
const Item = require('../models/item');

//CREATE
exports.category_create_get = asynchandler(async (req, res) => {
  res.render('category_form', {
    title: 'Add new category',
  });
});

exports.category_create_post = [
  body('name', 'Category name most contain atleast 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  asynchandler(async (req, res) => {
    const errors = validationResult(req);

    const category = new Category({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Add new category',
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      const categoryExists = await Category.findOne({
        name: req.body.name,
      }).exec();
      if (categoryExists) {
        res.redirect('/inventory/categories');
      } else {
        await category.save();
        res.redirect('/inventory/categories');
      }
    }
  }),
];

//READ
exports.category_list = asynchandler(async (req, res) => {
  const allCategory = await Category.find().exec();
  res.render('category_list', {
    title: 'List of categories',
    page: 'Categories',
    category_list: allCategory,
  });
});

//UPDATE
exports.category_update_get = asynchandler(async (req, res) => {
  const category = await Category.findById(req.params.id).exec();
  res.render('category_form', {
    title: 'Update category',
    category: category,
  });
});

exports.category_update_post = [
  body('name', 'Category name must contain atleast 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  asynchandler(async (req, res) => {
    const errors = validationResult(req);
    const category = new Category({
      _id: req.params.id,
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Update Category',
        errors: errors.array(),
        category: category,
      });
      return;
    } else {
      await Category.findByIdAndUpdate(req.params.id, category, {});
      res.redirect('/inventory/categories');
    }
  }),
];

//DELETE
exports.category_delete_get = asynchandler(async (req, res) => {
  const [allItems, category] = await Promise.all([
    await Item.find({ category: req.params.id }),
    await Category.findById(req.params.id),
  ]);

  res.render('category_delete', {
    title: 'Delete category',
    item_list: allItems,
    category: category,
  });
});

exports.category_delete_post = asynchandler(async (req, res) => {
  await Category.findByIdAndDelete(req.params.id).exec();
  res.redirect('/inventory/categories');
});
