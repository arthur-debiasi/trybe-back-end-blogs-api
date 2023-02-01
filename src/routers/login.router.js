const express = require('express');
const { loginController } = require('../controller');

const loginRouter = express.Router();

loginRouter.post('/', loginController.login);

module.exports = {
  loginRouter,
};