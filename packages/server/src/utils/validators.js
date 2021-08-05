const mongoose = require("mongoose");

const is_valid_id = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = {
  is_valid_id,
};
