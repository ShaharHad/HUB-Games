const router = require("express").Router();
const jwt = require("jsonwebtoken");

const User = require("../schemas/user");
const logger = require("../utils/logging_operation");

router.all("*", function (req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }
  if (
    req.url === "/" ||
    req.url === "/favicon.ico" ||
    req.url.includes("/auth")
  ) {
    return next();
  }
  let token = req.cookies.token;
  if (!token) {
    return res.status(404).json({ message: "No token" });
  } else {
    jwt.verify(token, process.env.email_secret, function (err, decoded) {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          return res.status(500).json({ message: err.message });
        } else {
          return res.status(500).json({ message: err.message });
        }
      } else {
        User.findOne({ _id: decoded.email })
          .then((user) => {
            if (!user) {
              return res
                .status(404)
                .json({ message: "no user with this token", code: 333 });
            }
            // TODO after finish email service, undo the comments
            // if (!user.active) {
            //   logger.debug("main:: user " + user._id + " is not approved yet");
            //   return res
            //     .status(301)
            //     .json({ message: "account not approve yet" });
            // }
            if (user.accessToken !== token) {
              logger.debug("main:: bed token for user " + user._id);
              return res.status(404).json({ message: "bad token" });
            }
            delete user.accessToken;
            delete user.password;
            req.user = user;
            return next();
          })
          .catch((err) => {
            logger.error("main:: " + err);
            return res.status(500).json({ message: err.errmsg, code: 332 });
          });
      }
    });
  }
});

module.exports = router;
