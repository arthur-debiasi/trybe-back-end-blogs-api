const { postService } = require('../services');
const { mapStatus } = require('../utils/mapStatus');

const postPost = async (req, res) => {
  try {
    const { user: { id } } = req;
    const { title, content, categoryIds } = req.body;
    const { type, message } = await postService.postPost({ id, title, content, categoryIds });
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
};