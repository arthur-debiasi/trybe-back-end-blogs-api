const { Category } = require('../../models');
const { categoryIdsSchema } = require('./schemas/schemas');

const validateCreatePost = async (categoryIds) => {
  const { error } = categoryIdsSchema.validate(categoryIds);
  if (error) return { type: 'BAD_REQUEST', message: { message: error.message } };
  const dataValues = await Category.findAll();
  const validIds = dataValues.map((e) => e.id);
  console.log('validIds', validIds);
  if (!categoryIds.every((e) => validIds.includes(e))) { 
    return { type: 'BAD_REQUEST', message: { message: 'one or more "categoryIds" not found' } };
  }
  return { type: null, message: '' };
}; 

module.exports = {
  validateCreatePost,
};