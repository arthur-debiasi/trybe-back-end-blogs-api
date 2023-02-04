const express = require('express');
const tokenValidate = require('../middlewares/tokenValidate');
const { postController } = require('../controller');
const { postFields } = require('../middlewares/postFields.validate');

const postRouter = express.Router();

postRouter.post('/', postFields, tokenValidate, postController.postPost);

module.exports = {
  postRouter,
};