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
