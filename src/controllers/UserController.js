const users = require("../models/UserModel");
const path = require("path");
const { checkToken } = require("../modules/jwt");

module.exports = class UserController {
  static async HomeGET(req, res) {
    res.render("home");
  }
  static async ProfileGET(req, res) {
    const { username } = req.params;

    let user = await users.findOne({
      username: username,
    });

    if (!user) {
      res.redirect("/404");
      return;
    }

    res.render("profile", {
      user,
    });
  }

  static async NotfoundGET(req, res) {
    res.render("notfound");
  }

  static async AvatarPATCH(req, res) {
    const { photo } = req.files;
    await photo.mv(
      path.join(
        __dirname,
        "..",
        "/public",
        photo.md5 + "." + photo.mimetype.split("/")[1]
      )
    );

    let token = req.cookies.token;

    token = checkToken(token);

    if (!token) {
      res.redirect("/users/login");
    }

    req.user = token._doc;

    let user = await users.findOneAndUpdate(
      { id: req.user.id },
      { avatar: `/public/${photo.md5 + "." + photo.mimetype.split("/")[1]}` }
    );

    res.status(200).json({
      ok: true,
      src: `/public/${photo.md5 + "." + photo.mimetype.split("/")[1]}`,
    });
  }
};
