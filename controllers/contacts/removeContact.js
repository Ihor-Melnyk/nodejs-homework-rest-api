const { Contact } = require("../../models/contact");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw res.status(404).json({ message: "Not found" });
  }
  res.json({ message: "contact remove" });
};

module.exports = removeContact;
