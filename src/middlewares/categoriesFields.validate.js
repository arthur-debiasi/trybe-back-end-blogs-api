const categoriesFields = ({ body: { name } }, res, next) => {
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  return next();
};

module.exports = {
  categoriesFields,
};
