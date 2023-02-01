const { userService } = require('../services');
const { loginToken } = require('./loginToken');
const { userSchema } = require('./schemas');

const validateCreateUser = async (user) => {
  const { error } = userSchema.validate(user);
  if (error) return { type: 400, message: { message: error.message } };
  const result = await userService.queryEmail(user.email);
  console.log(result);
  if (result) {
    return { type: 409, message: { message: 'User already registered' } };
  }
  return { type: 201, message: { token: loginToken(user.email) } };
}; 

module.exports = {
  validateCreateUser,
};