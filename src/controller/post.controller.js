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

const updatePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const { title, content } = req.body;
    const { id: userId } = req.user;
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

const deletePost = async (req, res) => {
  try {
    const {
      params: { id: postId },
      user: { id: userId },
    } = req;
    const { type, message } = await postService.deletePost({ postId, userId });
    return res.status(mapStatus(type)).json(message);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: internalErr, error: err.message });
  }
};

const searchPost = async (req, res) => {
  try {
    const { query: { q } } = req;
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
