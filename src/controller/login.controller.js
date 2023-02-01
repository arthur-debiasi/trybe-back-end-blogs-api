const { validLoginFields } = require('../validations/loginFields.validate');
const { loginToken } = require('../validations/loginToken');
const loginValidUserPassword = require('../validations/loginValidUserPassword');

// const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validLoginFields(req.body)) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }
    if (!await loginValidUserPassword(email, password)) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
    res.status(200).json({ token: loginToken(email) });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = {
  login,
};
