const bcrypt = require("bcrypt");

module.exports.generateHash = async function (data) {
  let salt = await bcrypt.genSalt(10);
  return bcrypt.hash(data, salt);
};

module.exports.compareHash = async (data, hash) => {
  return await bcrypt.compare(data, hash);
};
