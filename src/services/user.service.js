const { token } = require('../utils/token');
const { User } = require('../models');
const { validateCreateUser } = require('./validation/validateCreateUser');

const createUser = async ({ displayName, email, password, image }) => {
  const { type, message } = await validateCreateUser({ displayName, email, password, image });
  if (type) return { type, message }; 
  const result = await User.create({ displayName, email, password, image });
  return { type: 'CREATED', message: { token: token({ ...result.dataValues, password }) } };
};

const getUsers = async () => {
 const users = await User.findAll({ raw: true });
 console.log(users);
 const safeUsers = users.map(({ password, ...user }) => user);
  return { type: 'OK', message: safeUsers };
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return { type: 'NOT_FOUND', message: { message: 'User does not exist' } };
  return { type: 'OK', message: user };
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
};
