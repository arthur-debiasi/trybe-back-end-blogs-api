const loginFields = ({ body: { email, password } }, res, next) => {
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Some required fields are missing' });
  }
  return next();
};

module.exports = {
  loginFields,
};
