const { token } = require('../middlewares/token');
const { authService } = require('../services');
const { mapStatus } = require('../utils/mapStatus');

const auth = async ({ body: { email, password } }, res) => {
  try {
    const { type, message } = await authService.auth({ email, password });
    if (type) return res.status(mapStatus(type)).json(message);
    res.status(mapStatus('OK')).json({ token: token(email) });
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
