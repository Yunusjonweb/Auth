const {
  ProfileGET,
  AvatarPATCH,
  NotfoundGET,
  HomeGET,
} = require("../controllers/UserController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const ExpressFileUpload = require("express-fileupload");
const router = require("express").Router();

router.get("/home", HomeGET);
router.patch("/avatar", ExpressFileUpload(), AvatarPATCH);
router.get("/404", NotfoundGET);
router.get("/:username", AuthMiddleware, ProfileGET);

module.exports = {
  path: "/",
  router,
};
