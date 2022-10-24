const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { User } = require("../../models/user");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const extention = originalname.split(".").pop();
    const filename = `${_id}.${extention}`;
    const resultUpload = path.join(avatarDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);

    const filePathJimp = path.join("public", "avatars", filename);
    Jimp.read(filePathJimp)
      .then((image) => {
        return image.resize(250, Jimp.AUTO).write(filePathJimp); // save
      })
      .catch((err) => {
        throw err;
      });

    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
