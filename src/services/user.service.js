const { token } = require('../utils/token');
const { User } = require('../models');
const { validateCreateUser } = require('./validation/validateCreateUser');

const insertUser = async ({ displayName, email, password, image }) => {
  const { type, message } = await validateCreateUser({ displayName, email, password, image });
  if (type) return { type, message }; 
  await User.create({ displayName, email, password, image });
  return { type: 'CREATED', message: { token: token(email) } };
};

const getByUserId = async (id) => User.findByPk(id);
module.exports = {
  insertUser,
  getByUserId,
};
