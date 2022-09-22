const Joi = require("joi");
const myCustomJoi = Joi.extend(require("joi-phone-number"));

const addSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().min(3).max(45).required(),
  email: Joi.string().email().required(),
  phone: myCustomJoi.string().phoneNumber().required(),
});

module.exports = addSchema;
