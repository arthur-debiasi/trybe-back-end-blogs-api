const { userService } = require('../services');

const loginValidUserPassword = async (email, password) => {
  const result = await userService.queryEmail(email);
  console.log(result);
  if (result === null) return result;
  return result.dataValues.password === password;
};

module.exports = loginValidUserPassword;