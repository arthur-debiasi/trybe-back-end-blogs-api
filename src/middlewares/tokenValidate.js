const jwt = require('jsonwebtoken');

require('dotenv/config');
const { authService } = require('../services');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const tokenValidate = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const result = jwt.verify(token, secret);
    const { email, password } = result;
    const user = await authService.auth({ email, password });
    if (!user) return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
    req.user = { ...result, password: undefined, iat: undefined, exp: undefined };
    next();
  } catch (err) {
    return res.status(401).json({
      message:
          err.message === 'jwt malformed'
            ? 'Expired or invalid token'
            : err.message,
      });
  }
};

module.exports = tokenValidate;
