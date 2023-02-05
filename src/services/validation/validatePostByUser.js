const { User, BlogPost } = require('../../models');

const validatePostByUser = async ({ postId, userId }) => {
  const { dataValues: postFound } = await BlogPost.findByPk(postId, {
    include: [
      { model: User, as: 'user' },
    ],
  });
  if (postFound.user.id !== userId) {
    return { type: 'UNAUTHORIZED', message: { message: 'Unauthorized user' } };
  }
  return { type: null, message: '' };
};

module.exports = {
  validatePostByUser,
};