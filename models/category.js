const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');

const CategorySchema = new Schema({
  name: { type: String, required: true },
});

CategorySchema.virtual('url').get(function () {
  return `/category/${this._id}`;
});

CategorySchema.virtual('nameSlug').get(function () {
  return slugify(this.name.toLowerCase());
});

module.exports = mongoose.model('Category', CategorySchema);
