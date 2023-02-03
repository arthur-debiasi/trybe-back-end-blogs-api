const { categoriesService } = require('../services');
const { mapStatus } = require('../utils/mapStatus');

const postCategories = async ({ body: { name } }, res) => {
  try {
    const { type, message } = await categoriesService.postCategories(name);
    return res.status(mapStatus(type)).json(message);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = {
  postCategories,
};