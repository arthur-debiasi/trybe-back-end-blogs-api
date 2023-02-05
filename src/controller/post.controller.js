const { postService } = require('../services');
const { mapStatus } = require('../utils/mapStatus');

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
    return res
      .status(500)
      .json({ message: 'Erro interno', error: err.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const { type, message } = await postService.getPosts();
    return res.status(mapStatus(type)).json(message);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Erro interno', error: err.message });
  }
};

const getPostById = async ({ params: { id } }, res) => {
  try {
    const { type, message } = await postService.getPostById(id);
    console.log(message);
    if (!message) {
      return res
        .status(mapStatus('NOT_FOUND'))
        .json({ message: 'Post does not exist' });
    }
    return res.status(mapStatus(type)).json(message);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Erro interno', error: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const { title, content } = req.body;
    const { id: userId } = req.user;
    const { type, message } = await postService.updatePost({ title, content, postId, userId });
    console.log(message);
    return res.status(mapStatus(type)).json(message);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = {
  postPost,
  getPosts,
  getPostById,
  updatePost,
};
