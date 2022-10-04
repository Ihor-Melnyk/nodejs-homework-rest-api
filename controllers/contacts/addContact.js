const { Contact } = require("../../models");

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
  console.log(1);
};

module.exports = addContact;
