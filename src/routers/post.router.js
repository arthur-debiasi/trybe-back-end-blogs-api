const express = require('express');
const tokenValidate = require('../middlewares/tokenValidate');
const { postController } = require('../controller');
const { postFields } = require('../middlewares/postFields.validate');
const { updatePostFields } = require('../middlewares/updatePostFields.validate');

const postRouter = express.Router();

postRouter.get('/:id', tokenValidate, postController.getPostById);
postRouter.get('/', tokenValidate, postController.getPosts);
postRouter.post('/', postFields, tokenValidate, postController.postPost);
postRouter.put('/:id', updatePostFields, tokenValidate, postController.updatePost);
postRouter.delete('/:id', tokenValidate, postController.deletePost);
module.exports = {
  postRouter,
};