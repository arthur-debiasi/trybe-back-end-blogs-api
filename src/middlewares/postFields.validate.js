const postFields = ({ body: { title, content, categoryIds } }, res, next) => {
  if (!title || !categoryIds || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  return next();
};

module.exports = {
  postFields,
};