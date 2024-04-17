const express = require('express');
const router = express.Router();

//REQUIRE CONTROLLERS HERE...
const item_controller = require('../controllers/itemController');
//REQUIRE CONTROLLERS HERE...
const pet_controller = require('../controllers/petController');
//REQUIRE CONTROLLERS HERE...
const category_controller = require('../controllers/categoryController');
//DEFINE ROUTES HERE...

//INDEX
router.get('', item_controller.item_list);

//CREATE
router.get('/item/create', item_controller.item_create_get);

router.post('/item/create', item_controller.item_create_post);

//READ
router.get('/item/:id', item_controller.item_detail); //show single item detail

//UPDATE
router.get('/item/:id/update', item_controller.item_update_get);

router.post('/item/:id/update', item_controller.item_update_post);

//DELETE
router.get('/item/:id/delete', item_controller.item_delete_get);

router.post('/item/:id/delete', item_controller.item_delete_post);

//CATEGORY

//CREATE
router.get('/category/create', category_controller.category_create_get);

router.post('/category/create', category_controller.category_create_post);

//READ
router.get('/categories', category_controller.category_list); // show all categories

//UPDATE
router.get('/category/:id/update', category_controller.category_update_get);

router.post('/category/:id/update', category_controller.category_update_post);

//DELETE
router.get('/category/:id/delete', category_controller.category_delete_get);

router.post('/category/:id/delete', category_controller.category_delete_post);

//PET

//CREATE
router.get('/pet/create', pet_controller.pet_create_get);

router.post('/pet/create', pet_controller.pet_create_post);

//READ
router.get('/pets', pet_controller.pet_list); // show all categories

//UPDATE
router.get('/pet/:id/update', pet_controller.pet_update_get);

router.post('/pet/:id/update', pet_controller.pet_update_post);

//DELETE
router.get('/pet/:id/delete', pet_controller.pet_delete_get);

router.post('/pet/:id/delete', pet_controller.pet_delete_post);

module.exports = router;
