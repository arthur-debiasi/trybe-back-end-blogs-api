const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const token = ({ email, password }) => jwt.sign({ data: { email, password } }, secret, jwtConfig);
  
module.exports = { token };