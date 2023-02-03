const { Category } = require('../models');

const postCategories = async (name) => {
  const category = await Category.create({ name });
  return { type: 'CREATED', message: category };
};

const getCategories = async () => {
  const categories = await Category.findAll({ raw: true });
  return { type: 'OK', message: categories };
};

module.exports = {
  postCategories,
  getCategories,
};
