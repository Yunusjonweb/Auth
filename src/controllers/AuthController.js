const { v4 } = require("uuid");
const { generateHash, compareHash } = require("../modules/bcrypt");
const { generateToken } = require("../modules/jwt");
const Joi = require("joi");
const users = require("../models/UserModel");

const signUpSchema = Joi.object({
  full_name: Joi.string().min(5).max(50).required(),
  username: Joi.string().min(4).max(25).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

module.exports = class UserController {
  static LoginGET(req, res) {
    res.render("login");
  }

  static SignupGET(req, res) {
    res.render("signup");
  }

  static async LogoutGET(req, res) {
    const token = req.cookies.token;
    if (token) {
      try {
        res.clearCookie("token");
        res.redirect("/users/login");
      } catch (error) {
        console.error("Invalid token:", error.message);
        res.redirect("/users/login");
      }
    } else {
      res.redirect("/users/login");
    }
  }

  static async SignupPOST(req, res) {
    try {
      const { full_name, email, username, password } = req.body;

      const { error } = signUpSchema.validate(req.body);

      if (error) {
        throw new Error("Invalid data");
      }

      let hash = await generateHash(password);

      let user = await users.create({
        id: v4(),
        full_name,
        email,
        username,
        password: hash,
      });

      console.log(user);

      let token = generateToken({
        ...user,
        password: undefined,
      });

      res.cookie("token", token).redirect("/users/login");
    } catch (err) {
      res.render("signup", {
        error: "All fields must be filled correctly",
      });
    }
  }

  static async LoginPOST(req, res) {
    try {
      const { error } = loginSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { email, password } = req.body;

      let user = await users.findOne({
        email,
      });

      if (!user) {
        throw new Error("User is not registered");
      }

      let isPasswordTrue = await compareHash(password, user.password);

      if (!isPasswordTrue) {
        throw new Error("Incorrect password");
      }

      let token = generateToken({
        ...user,
        password: undefined,
      });

      res.cookie("token", token).redirect("/home");
    } catch (err) {
      res.render("login", {
        error: err + "",
      });
    }
  }
};
