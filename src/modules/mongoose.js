const mongoose = require("mongoose");
const { MONGO_URL } = require("../../config");

module.exports = async function mongo() {
  try {
    await mongoose.connect(MONGO_URL);
  } catch (err) {
    console.log("Connection  failed: " + err);
  }
};
