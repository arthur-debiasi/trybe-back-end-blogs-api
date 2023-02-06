const { Category } = require('../../models');
const { categoryIdsSchema } = require('./schemas/schemas');

const validateCreatePost = async (categoryIds) => {
  const { error } = categoryIdsSchema.validate(categoryIds);
  if (error) {
    return { type: 'BAD_REQUEST', message: { message: error.message } };
  }
  const categories = await Category.findAll();
  const validIds = categories.map((e) => e.id);
  const isValidCategoryIds = categoryIds.every((e) => validIds.includes(e));
  if (!isValidCategoryIds) { 
    return { type: 'BAD_REQUEST', message: { message: 'one or more "categoryIds" not found' } };
  }
  return { type: null, message: '' };
}; 

module.exports = {
  validateCreatePost,
};