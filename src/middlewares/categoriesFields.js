const categoriesFields = ({ body: { name } }, res, next) => {
  console.log(name);
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  return next();
};

module.exports = {
  categoriesFields,
};