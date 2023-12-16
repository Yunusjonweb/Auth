const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const express = require("express");
const CookieParser = require("cookie-parser");
const { PORT } = require("./config");
const mongo = require("./src/modules/mongoose");
const nodemailer = require("nodemailer");

const app = express();

app.listen(PORT, () => {
  console.log("Server ready!");
});

async function server() {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(CookieParser());
  app.use("/public", express.static(path.join(__dirname, "src", "public")));

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "src", "views"));

  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: "yunusbekxabibullayev518@gmail.com",
  //     pass: "mxve y dlw ua sp xue z",
  //   },
  // });

  // // Define the email content
  // const mailOptions = {
  //   from: "yunusbekxabibullayev518@gmail.com",
  //   to: "yunusbekhabibullayev517@gmail.com",
  //   subject: "Test Email",
  //   text: "This is a test email sent using Nodemailer in Node.js",
  // };

  // // Send the email
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.log("Error occurred:", error);
  //   } else {
  //     console.log("Email sent:", info.response);
  //   }
  // });

  fs.readdir(path.join(__dirname, "src", "routes"), (err, data) => {
    if (!err) {
      data.forEach((file) => {
        let routePath = path.join(__dirname, "src", "routes", file);
        const Route = require(routePath);
        if (Route.path && Route.router) {
          app.use(Route.path, Route.router);
        }
      });
    }
  });

  await mongo();
}

server();
