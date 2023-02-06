const { postService } = require('../services');
const { mapStatus } = require('../utils/mapStatus');

const internalErr = 'Erro interno';

const postPost = async (req, res) => {
  try {
    const {
      user: { id },
    } = req;
    const { title, content, categoryIds } = req.body;
    const { type, message } = await postService.postPost({
      id,
      title,
      content,
      categoryIds,
    });
    return res.status(mapStatus(type)).json(message);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: internalErr, error: err.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const { type, message } = await postService.getPosts();
    return res.status(mapStatus(type)).json(message);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: internalErr, error: err.message });
  }
};

const getPostById = async ({ params: { id } }, res) => {
  try {
    const { type, message } = await postService.getPostById(id);
    return res.status(mapStatus(type)).json(message);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: internalErr, error: err.message });
  }
};

const updatePost = async (
  { body: { title, content }, params: { id: postId }, user: { id: userId } },
  res,
) => {
  try {
    const { type, message } = await postService.updatePost({
      title,
      content,
      postId,
      userId,
    });
    return res.status(mapStatus(type)).json(message);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: internalErr, error: err.message });
  }
};

const deletePost = async (
  { params: { id: postId }, user: { id: userId } },
  res,
) => {
  try {
    const { type, message } = await postService.deletePost({ postId, userId });
    return res.status(mapStatus(type)).json(message);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: internalErr, error: err.message });
  }
};

const searchPost = async ({ query: { q } }, res) => {
  try {
    const { type, message } = await postService.searchPost({ q });
    return res.status(mapStatus(type)).json(message);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: internalErr, error: err.message });
  }
};

module.exports = {
  postPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
};
