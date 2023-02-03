const { User } = require('../../models');
const { userSchema } = require('./schemas/schemas');

const validateCreateUser = async ({ displayName, email, password, image }) => {
  const { error } = userSchema.validate({ displayName, email, password, image });
  if (error) return { type: 'BAD_REQUEST', message: { message: error.message } };
  const result = await User.findOne({ where: { email, password } });
  if (result) return { type: 'CONFLICT', message: { message: 'User already registered' } };
  return { type: null, message: '' };
}; 

module.exports = {
  validateCreateUser,
};