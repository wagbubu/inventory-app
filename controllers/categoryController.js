const asynchandler = require('express-async-handler');

//CREATE
exports.category_create_get = asynchandler(async (req, res) => {
  res.send('NOT IMPLEMENTED: Category List');
});

exports.category_create_post = asynchandler(async (req, res) => {
  res.send('NOT IMPLEMENTED: Category List');
});

//READ
exports.category_list = asynchandler(async (req, res) => {
  res.send('NOT IMPLEMENTED: Category List');
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
