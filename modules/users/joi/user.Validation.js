
const Joi = require("joi");

module.exports = {
  addUserSchema: {
    body: Joi.object()
      .required()
      .keys({
        name: Joi.string().required().messages({
          "string.empty": "sorry ...name is required",
        }),
        email: Joi.string().required().email().messages({
          "string.email": "sorry ..please enter valid email",
        }),
        password:Joi.string().required(),
        Department:Joi.string().required(),
        level:Joi.number(),
        role: Joi.string().required(),
      }),
  },
  signinSchema: {
    body: Joi.object()
      .required()
      .keys({
        email: Joi.string().required().email(),
        password:Joi.string().required(),
      }),
  },
};