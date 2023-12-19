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

// TODO work on it after finish with email_service
// const get_user_from_verification_token = function (verification_token) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(function () {
//       User.findOne({ verification_token: verification_token })
//         .then((user) => {
//           if (user) {
//             resolve(user);
//           } else {
//             reject({
//               status: 404,
//               message:
//                 "user with verification_token " +
//                 verification_token +
//                 " not found",
//             });
//           }
//         })
//         .catch((err) => {
//           if (err) {
//             reject({ status: 500, message: err.errmsg });
//           }
//         });
//     }, 250);
//   });
// };

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
              //TODO work on email services later
              // emailService
              //   .send_verification_mail(new_user)
              //   .then((info) => {
              //     if (info) {
              //       logger.debug(
              //         "regiser:: send email to user for confirmation" +
              //           new_user._id
              //       );
              //       return res.status(200).json({
              //         message: "Check your email for mail confirmation",
              //       });
              //     }
              //   })
              //   .catch((err) => {
              //     logger.error(
              //       "regiser:: error while sending email to user" + new_user._id
              //     );
              //     return res.status(501).json({
              //       message:
              //         "error while sending email to user for confirmation",
              //     });
              //   });
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
        // TODO finish this after finish the email service
        // if (!user.active) {
        //   logger.debug(
        //     "login:: user " +
        //       credentials.email +
        //       " is not approved yet, please check in your email for mail confirmation"
        //   );
        //   return res.status(300).json({
        //     message: "user not approved yet, please check your email",
        //   });
        // }
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

// TODO finish it later
// router.get("/new_user_confirmation", (req, res) => {
//   const verification_token = req.query.token;
//   if (!verification_token) {
//     logger.debug("new_user_confirmation:: verification token is missing");
//     return res.status(400).json({ message: "verification token is missing" });
//   }
//   get_user_from_verification_token(verification_token)
//     .then((user) => {
//       if (user) {
//         user.verification_token = "";
//         user.active = true;
//         user
//           .save()
//           .then((user) => {
//             if (user) {
//               let htmlTemplatePathVerificationSuccess = path.join(
//                 __dirname,
//                 "../",
//                 "html",
//                 "verification_success.html"
//               );
//               let htmlTemplateVerificationSuccess = fs.readFileSync(
//                 htmlTemplatePathVerificationSuccess,
//                 "utf-8"
//               );
//               logger.debug(
//                 "new_user_confirmation:: admin approved user " + user._id
//               );
//               return res.status(200).send(htmlTemplateVerificationSuccess);
//             }
//           })
//           .catch((err) => {
//             let htmlTemplatePathVerificationFail = path.join(
//               __dirname,
//               "../",
//               "html",
//               "verification_fail.html"
//             );
//             let htmlTemplateVerificationFail = fs.readFileSync(
//               htmlTemplatePathVerificationFail,
//               "utf-8"
//             );
//             logger.error(
//               "new_user_confirmation:: admin couldn't approved user " +
//                 user._id +
//                 " error:  " +
//                 err
//             );
//             return res.status(500).send(htmlTemplateVerificationFail);
//           });
//       }
//     })
//     .catch((err) => {
//       let htmlTemplatePathVerificationFail = path.join(
//         __dirname,
//         "../",
//         "html",
//         "verification_fail.html"
//       );
//       let htmlTemplateVerificationFail = fs.readFileSync(
//         htmlTemplatePathVerificationFail,
//         "utf-8"
//       );
//       logger.error("new_user_confirmation:: " + err);
//       return res.status(500).send(htmlTemplateVerificationFail);
//     });
// });

module.exports = router;
