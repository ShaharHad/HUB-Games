const router = require("express").Router();
const { check, validationResult } = require("express-validator");

const User = require("../../schemas/user");
const logger = require("../../utils/logging_operation");

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

router.get("/", (req, res) => {
  return res.status(200).json(req.user);
});

// api for tests use only !!!!
router.delete("/delete_user", (req, res) => {
  const email = req.body.email.toLowerCase();
  if (req.user._id !== email) {
    logger.debug(req.user._id + " try to delete: " + email);
    return res
      .status(400)
      .json({ message: "user can delete only its account" });
  }
  User.findByIdAndDelete(email)
    .then((user) => {
      if (user) {
        logger.info(req.user._id + " delete user: " + email);
        return res.status(200).json({ message: "User Deleted successfully" });
      } else {
        logger.info(email + " not found");
        return res.status(304).json({ message: "User Deleted not success" });
      }
    })
    .catch((err) => {
      logger.error("delete_user:: err - " + err);
      return res.status(500).json({ message: err.errmsg });
    });
});

module.exports = router;
