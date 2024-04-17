#! /usr/bin/env node

console.log(
  'This script populates some test items, pets, and categories to your database'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require('../models/item');
const Pet = require('../models/pet');
const Category = require('../models/category');

// const genres = [];
// const authors = [];
// const books = [];
// const bookinstances = [];

const pets = [];
const categories = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createCategories();
  await createPets();
  await createItems();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function itemCreate(
  name,
  description,
  category,
  price,
  number_in_stock,
  pet
) {
  //instantiate new Item
  const item = new Item({
    name: name,
    description: description,
    category: category,
    price: price,
    number_in_stock: number_in_stock,
    pet: pet,
  });
  await item.save();
  //store item in our items array so we can reference it to other models later
  console.log(`Added item: ${name}`);
}

async function petCreate(index, name) {
  const pet = new Pet({ name: name });
  await pet.save();
  pets[index] = pet;
  console.log(`Added pet: ${name}`);
}

async function categoryCreate(index, name) {
  const category = new Category({ name: name });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function createItems() {
  console.log('Adding Items');
  await Promise.all([
    itemCreate(
      'Pedigree 10kg dry dog food',
      'A dry dog food that is full of food colorings',
      categories[0],
      499.99,
      50,
      pets[0]
    ),
    itemCreate(
      'Whiskas wet food pouch',
      "A wet cat food that doesn't matter what flavor you choose, they all smell the same.",
      categories[1],
      74.99,
      30,
      pets[1]
    ),
    itemCreate(
      'Whiskas dry food 10kg',
      'A dry cat food that is very colorful because it is full of food colorings',
      categories[0],
      1299.99,
      54,
      pets[1]
    ),
    itemCreate(
      'PowerCat dry food 10kg',
      'A dry cat food that makes your cat fat',
      categories[0],
      1494.99,
      10,
      pets[1]
    ),
    itemCreate(
      'PowerDog dry food 10kg',
      'A dry dog food that makes your dog fat',
      categories[0],
      1799.99,
      10,
      pets[0]
    ),
    itemCreate(
      'Generic dry dog food 10kg',
      "It doesn't matter, your dog won't eat this anyway.. It's cheap, what do you expect? ",
      categories[0],
      199.99,
      10,
      pets[0]
    ),
  ]);
}

async function createPets() {
  console.log('Adding Pets');
  await Promise.all([petCreate(0, 'Dog'), petCreate(1, 'Cat')]);
}

async function createCategories() {
  console.log('Adding Categories');
  await Promise.all([
    categoryCreate(0, 'Dry food'),
    categoryCreate(1, 'Wet food'),
  ]);
}
