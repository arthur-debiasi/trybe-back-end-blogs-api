const { BlogPost, PostCategory, Category, User } = require('../models');
const { validateCreatePost } = require('./validation/validateCreatePost');

const postPost = async ({ id, title, content, categoryIds }) => {
  const { type, message } = await validateCreatePost(categoryIds);
  if (type) return { type, message };
  const { dataValues } = await BlogPost.create({ title, content, userId: id });
  const postCategories = categoryIds.map((categoryId) => ({
    categoryId,
    postId: dataValues.id,
  }));
  await PostCategory.bulkCreate(postCategories);
  return { type: 'CREATED', message: dataValues };
};

const getPosts = async () => {
  const result = await BlogPost.findAll({
    include: [
      { model: Category, as: 'categories', through: { attributes: [] } },
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
    ],
  });
  // const xabla = result.map((post) => ({ ...post, user: { ...post.user, password: undefined } }));
  return { type: 'OK', message: result };
};

module.exports = {
  postPost,
  getPosts,
};
