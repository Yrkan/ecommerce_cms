const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

const comparePassword = async (clear, hashed) => {
  if (await bcrypt.compare(clear, hashed)) {
    return true;
  }
  return false;
};

module.exports = {
  encryptPassword,
  comparePassword,
};
