const updatePostFields = ({ body: { title, content } }, res, next) => {
  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  return next();
};

module.exports = {
  updatePostFields,
};