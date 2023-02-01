const { userService } = require('../services');
const { validateCreateUser } = require('../validations/validateBySchema');

const createUser = async (req, res) => {
  try {
    const { type, message } = await validateCreateUser(req.body);
    if (type === 201) {
      // const { firstName, lastName, age, city, street, number } = req.body;
      // await userService.insertUser({ firstName, lastName, age, city, street, number });
      await userService.insertUser(req.body);
    }
    res.status(type).json(message);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = {
  createUser,
};