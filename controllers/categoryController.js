const Category = require('../models/category');
const { body, validationResult } = require('express-validator');
const asynchandler = require('express-async-handler');

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
    category_list: allCategory,
  });
});

//UPDATE
exports.category_update_get = asynchandler(async (req, res) => {
  res.send(`NOT IMPLEMENTED: Category Update GET ${req.params.id}`);
});

exports.category_update_post = asynchandler(async (req, res) => {
  res.send(`NOT IMPLEMENTED: Category Update POST ID: ${req.params.id}`);
});

//DELETE
exports.category_delete_get = asynchandler(async (req, res) => {
  res.send(`NOT IMPLEMENTED: Category Delete GET ID: ${req.params.id}`);
});

exports.category_delete_post = asynchandler(async (req, res) => {
  res.send(`NOT IMPLEMENTED: Category Delete POST ID: ${req.params.id}`);
});
