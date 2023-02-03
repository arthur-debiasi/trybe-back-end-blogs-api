const express = require('express');
const { categoriesController } = require('../controller');
const { categoriesFields } = require('../middlewares/categoriesFields');
const tokenValidate = require('../middlewares/tokenValidate');

const categoriesRouter = express.Router();

categoriesRouter.post('/', categoriesFields, tokenValidate, categoriesController.postCategories);

module.exports = {
  categoriesRouter,
};