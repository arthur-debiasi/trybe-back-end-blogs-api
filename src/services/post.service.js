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
      { model: User, as: 'user' },
    ],
  });
  // const xabla = result.map((post) => ({ ...post, user: { ...post.user, password: undefined } }));
  return { type: 'OK', message: result };
};

const getPostById = async (id) => {
  const result = await BlogPost.findByPk(id, {
    include: [
      { model: Category, as: 'categories', through: { attributes: [] } },
      { model: User, as: 'user' },
    ],
  });
  return { type: 'OK', message: result };
};

const updatePost = async ({ title, content, postId, userId }) => {
  const { dataValues: postFound } = await BlogPost.findByPk(postId, {
    include: [
      { model: User, as: 'user' },
    ],
  });
  if (postFound.user.id !== userId) {
    return { type: 'UNAUTHORIZED', message: { message: 'Unauthorized user' } };
  }
  await BlogPost.update({ title, content }, { where: { id: postId } });
  const { dataValues: postUpdated } = await BlogPost.findByPk(postId, {
    include: [
      { model: Category, as: 'categories', through: { attributes: [] } },
      { model: User, as: 'user' },
    ],
  });
  return { type: 'OK', message: postUpdated };
};

module.exports = {
  postPost,
  getPosts,
  getPostById,
  updatePost,
};
