const { BlogPost, PostCategory, Category, User, Sequelize } = require('../models');
const { validateCreatePost } = require('./validation/validateCreatePost');
const { validatePostByUser } = require('./validation/validatePostByUser');

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
  if (!result) return { type: 'NOT_FOUND', message: { message: 'Post does not exist' } };
  return { type: 'OK', message: result };
};

const updatePost = async ({ title, content, postId, userId }) => {
  const { type, message } = await validatePostByUser({ postId, userId });
  if (type) return { type, message };
  await BlogPost.update({ title, content }, { where: { id: postId } });
  const { dataValues: postUpdated } = await BlogPost.findByPk(postId, {
    include: [
      { model: Category, as: 'categories', through: { attributes: [] } },
      { model: User, as: 'user' },
    ],
  });
  return { type: 'OK', message: postUpdated };
};

const deletePost = async ({ postId, userId }) => {
  const result = await BlogPost.findByPk(postId);
  if (!result) return { type: 'NOT_FOUND', message: { message: 'Post does not exist' } };
  const { type, message } = await validatePostByUser({ postId, userId });
  if (type) return { type, message };
  console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv');
  await BlogPost.destroy({ where: { id: postId } });
  return { type: 'NO_CONTENT', message: '' };
};

const searchPost = async ({ q }) => {
  const result = await BlogPost.findAll({
    where: Sequelize.or({ title: {
      [Sequelize.Op.like]: `%${q}%`,
    } }, Sequelize.or({ content: {
      [Sequelize.Op.like]: `%${q}%`,
    } })),
    include: [
      { model: Category, as: 'categories', through: { attributes: [] } },
      { model: User, as: 'user' },
    ],
  });// https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators
  console.log(result);
  if (!result) return { type: 'OK', message: [] };
  return { type: 'OK', message: result };
};

module.exports = {
  postPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
};
