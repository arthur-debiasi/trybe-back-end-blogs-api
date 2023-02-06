const { userService } = require('../services');
const { mapStatus } = require('../utils/mapStatus');

const createUser = async ({ body }, res) => {
  try {
    const { type, message } = await userService.createUser(body);
    return res.status(mapStatus(type)).json(message);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Erro interno', error: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const { type, message } = await userService.getUsers();
    return res.status(mapStatus(type)).json(message);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Erro interno', error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { type, message } = await userService.getUserById(req.params.id);
    return res.status(mapStatus(type)).json(message);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Erro interno', error: err.message });
  }
};

const deleteMe = async ({ user: { id } }, res) => {
  try {
    const { type, message } = await userService.deleteMe(id);
    return res.status(mapStatus(type)).json(message);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Erro interno', error: err.message });
  }
};
module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteMe,
};
