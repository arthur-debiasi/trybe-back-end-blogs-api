const validLoginFields = (body) => {
  const { email, password } = body;
  if (!email || !password) {
    return false;
  }
  return true;
};

module.exports = {
  validLoginFields,
};