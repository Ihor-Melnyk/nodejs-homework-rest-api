const { Contact } = require("../../models/contact");
const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, ...query } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find(
    { owner, ...query },
    { createdAt: 0, updatedAt: 0 },
    {
      skip,
      limit,
    }
  ).populate("owner", "name email");
  res.json(result);
};

module.exports = listContacts;
