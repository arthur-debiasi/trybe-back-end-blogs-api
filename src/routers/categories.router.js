const express = require('express');
const { categoriesController } = require('../controller');
const { categoriesFields } = require('../middlewares/categoriesFields.validate');
const tokenValidate = require('../middlewares/tokenValidate');

const categoriesRouter = express.Router();

categoriesRouter.post('/', categoriesFields, tokenValidate, categoriesController.postCategories);
categoriesRouter.get('/', tokenValidate, categoriesController.getCategories);

module.exports = {
  categoriesRouter,
};