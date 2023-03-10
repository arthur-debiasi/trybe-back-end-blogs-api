const express = require('express');
const { userController } = require('../controller');
const tokenValidate = require('../middlewares/tokenValidate');

const userRouter = express.Router();

userRouter.post('/', userController.createUser);
userRouter.get('/:id', tokenValidate, userController.getUserById);
userRouter.get('/', tokenValidate, userController.getUsers);
userRouter.delete('/me', tokenValidate, userController.deleteMe);

module.exports = {
  userRouter,
};