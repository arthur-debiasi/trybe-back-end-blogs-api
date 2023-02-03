const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const token = (email) => jwt.sign({ data: { email } }, secret, jwtConfig);
  
module.exports = { token };