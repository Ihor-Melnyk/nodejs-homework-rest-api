const contacts = require("../../models/contacts");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw res.status(404).json({ message: "Not found" });
  }
  res.json({ message: "contact remove" });
};

module.exports = removeContact;
