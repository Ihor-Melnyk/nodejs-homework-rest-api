const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const userSubscription = ["starter", "pro", "business"];

  try {
    if (!userSubscription.includes(subscription)) {
      throw RequestError(
        400,
        `The subscript must have one of the following values "${userSubscription}`
      );
    }
    const result = await User.findByIdAndUpdate(
      _id,
      { subscription },
      {
        new: true,
      }
    );

    if (!result) {
      throw RequestError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
