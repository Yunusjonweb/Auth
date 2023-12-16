const { sign, verify, JsonWebTokenError } = require("jsonwebtoken");
const { SECRET_WORD } = require("../../config");

module.exports = {
  generateToken(data) {
    return sign(data, "SECRET_WORD");
  },

  checkToken(token) {
    if (!token) {
      throw new JsonWebTokenError("jwt must be provided");
    }
    try {
      return verify(token, "SECRET_WORD");
    } catch (error) {
      throw new JsonWebTokenError("Invalid jwt");
    }
  },
};
