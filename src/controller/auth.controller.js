const { authService } = require('../services');
const { mapStatus } = require('../utils/mapStatus');

const auth = async ({ body: { email, password } }, res) => {
  try {
    const { type, message } = await authService.auth({ email, password });
    return res.status(mapStatus(type)).json(message);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = {
  auth,
};
