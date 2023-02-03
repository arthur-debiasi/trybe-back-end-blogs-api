const { User } = require('../models');
const { token } = require('../utils/token');

const auth = async ({ email, password }) => {
  const result = await User.findOne({ where: { email, password } });
  if (!result) return { type: 'BAD_REQUEST', message: { message: 'Invalid fields' } };
  return { type: 'OK', message: { token: token({ email, password }) } };
};

module.exports = {
  auth,
};