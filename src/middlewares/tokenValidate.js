const jwt = require('jsonwebtoken');

require('dotenv/config');
const { User } = require('../models');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const tokenValidate = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const result = jwt.verify(token, secret);
    const { email } = result;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
    req.user = result;
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
