const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveErrors } = require("../middlewares");

const numberRegexp = /^\+38\(0\d{2}\)\d{3}-\d{2}-\d{2}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return numberRegexp.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid phone number! Enter the number in the format +38(0**)***-**-**`,
      },
      required: [true, "User phone number required"],
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveErrors);

const addSchema = Joi.object({
  name: Joi.string().min(3).max(45).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(numberRegexp).required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};
const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
