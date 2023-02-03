const { Category } = require('../models');

const postCategories = async (name) => {
  const categories = await Category.create({ name });
   return { type: 'CREATED', message: categories };
 };

 module.exports = {
  postCategories,
 };
