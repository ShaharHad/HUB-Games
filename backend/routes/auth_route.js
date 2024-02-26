const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("basic-auth");
const fs = require("fs");
const path = require("path");
const { check, validationResult } = require("express-validator");
const logger = require("../utils/logging_operation");
const User = require("../schemas/user");
// const emailService = require("../utils/email_operation"); TODO need to finish it later

require("dotenv").config();

function validateParam(errors) {
  if (!errors.isEmpty()) {
    let error_message = "";
    for (let i = 0; i < errors.array().length; i++) {
      error_message += errors.array()[i].msg + ", ";
    }
    logger.warn("Wrong parameters: " + error_message);
    return false;
  }
  return true;
}

const get_user_from_email = function (email) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      User.findOne({ _id: email })
        .then((user) => {
          if (user) {
            resolve(user);
          } else {
            reject({ status: 404, message: "User not exist" });
          }
        })
        .catch((err) => {
          if (err) {
            reject({ status: 500, message: err.errmsg });
          }
        });
    }, 250);
  });
};

router.post(
  "/register",
  [
    check("first_name").exists().withMessage("Must provide first name"),
    check("first_name").isString().withMessage("first name must be string"),
    check("last_name").exists().withMessage("Must provide last name"),
    check("last_name").isString().withMessage("last name must be string"),
    check("password").exists().withMessage("Must provide password"),
    check("password").isString().withMessage("password must be string"),
    check("email").exists().withMessage("Must provide email"),
    check("email").isEmail().withMessage("illegal email"),
  ],
  (req, res) => {
    if (!validateParam(validationResult(req))) {
      logger.debug("regiser:: Wrong parameters for " + req.body.email);
      return res.status(422).json({ message: "wrong parameters" });
    }
    req.body.email = req.body.email.toLowerCase();
    const accessToken = jwt.sign(
      { email: req.body.email },
      process.env.email_secret,
      { expiresIn: "1y" }
    );
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      _id: req.body.email,
      accessToken: accessToken,
    });
    let saltRounds = parseInt(process.env.saltRounds);
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        user.password = hash;
        user
          .save()
          .then((new_user) => {
            if (new_user) {
              logger.debug("regiser:: user " + new_user._id + " is created");
              return res.status(200).json({ message: "User created" });
            } else {
              logger.error("regiser:: user " + new_user._id + " not created");
              return res.status(500).json({ message: "User not created" });
            }
          })
          .catch((err) => {
            if (err) {
              if (err.name === "MongoServerError" && err.code === 11000) {
                // Duplicate username
                logger.error("register:: duplicate user for " + req.body.email);
                return res
                  .status(300)
                  .json({ message: req.body.email + " already exists!" });
              } else {
                // Some other error
                logger.error("register:: " + err.errmsg);
                return res.status(500).json({ message: err.errmsg });
              }
            }
          });
      });
    });
  }
);

router.post(
  "/login",
  [
    check("password").exists().withMessage("Must provide password"),
    check("password").isString().withMessage("password must be string"),
    check("email").exists().withMessage("Must provide email"),
    check("email").isEmail().withMessage("illegal email"),
  ],
  (req, res) => {
    if (!validateParam(validationResult(req))) {
      return res.status(422).json({ message: "wrong parameters" });
    }
    const credentials = {
      email: req.body.email,
      pass: req.body.password,
    };
    get_user_from_email(credentials.email.toLowerCase())
      .then(function (user) {
        bcrypt.compare(credentials.pass, user.password, function (err, result) {
          if (err) {
            logger.debug("login:: " + err);
            return res.status(500).json({ message: err });
          } else {
            if (result) {
              let copy = JSON.parse(JSON.stringify(user));
              res.cookie("token", copy.accessToken, {
                secure: true,
                httpOnly: true,
                path: "/api",
              });
              res.status(200).json({ message: "Login successfully" });
            } else {
              logger.debug("login:: user not exist " + user._id);
              return res.status(404).json({ message: "user not exist" });
            }
          }
        });
      })
      .catch((err) => {
        logger.error("login:: " + err.message);
        return res.status(err.status).json({ message: err.message });
      });
  }
);

module.exports = router;
