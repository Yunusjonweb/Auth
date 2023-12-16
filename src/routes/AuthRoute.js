const {
  SignupGET,
  LoginGET,
  SignupPOST,
  LoginPOST,
  LogoutGET,
} = require("../controllers/AuthController");

const router = require("express").Router();

router.get("/login", LoginGET);
router.get("/signup", SignupGET);
router.get("/logout", LogoutGET);

router.post("/login", LoginPOST);
router.post("/signup", SignupPOST);

module.exports = {
  path: "/users",
  router,
};
