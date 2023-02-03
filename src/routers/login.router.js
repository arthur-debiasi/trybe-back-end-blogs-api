const express = require('express');
const { authController } = require('../controller');
const { loginFields } = require('../middlewares/loginFields.validate');

const loginRouter = express.Router();

loginRouter.post('/', loginFields, authController.auth);

module.exports = {
  loginRouter,
};