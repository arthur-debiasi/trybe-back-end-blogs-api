const Joi = require('joi');

const displayName = Joi.string().min(8).required();

const email = Joi.string().email().required();

const password = Joi.string().min(6).required();

const image = Joi.string();

const userSchema = Joi.object({ displayName, email, password, image });
module.exports = {
  userSchema,
};