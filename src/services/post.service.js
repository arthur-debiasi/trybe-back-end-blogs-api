const { BlogPost, PostCategory } = require('../models');
const { validateCreatePost } = require('./validation/validateCreatePost');

const postPost = async ({ id, title, content, categoryIds }) => {
  const { type, message } = await validateCreatePost(categoryIds);
  if (type) return { type, message };
  const { dataValues } = await BlogPost.create({ title, content, userId: id });
  const postCategories = categoryIds.map((categoryId) => ({ categoryId, postId: dataValues.id }));
  await PostCategory.bulkCreate(postCategories);
  return { type: 'CREATED', message: dataValues };
};

module.exports = {
  postPost,
};