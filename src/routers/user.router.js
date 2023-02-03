const express = require('express');
const { userController } = require('../controller');
const tokenValidate = require('../middlewares/tokenValidate');

const userRouter = express.Router();

userRouter.post('/', userController.createUser);
userRouter.get('/', tokenValidate, userController.getUsers);

module.exports = {
  userRouter,
};