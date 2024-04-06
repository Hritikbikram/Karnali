const express = require("express");
const userController = require("../Controllers/UserAllController");
const routes = express.Router();
// const Joi = require("joi");
// const validator = require("express-joi-validation").createValidator({});

// const userAuth = require("../middleware/UserAuth");

// const loginSchema = Joi.object().keys({
//   email: Joi.string().email().required(),
//   password: Joi.string().required().min(3),
// });

// const employee = Joi.object().keys({
//   companyName: Joi.string().required(),
//   companyDescription: Joi.string().required(),
//   email: Joi.string().email().required(),
//   address: Joi.string().required(),
//   password: Joi.string().required().min(3),
// });

// const clientSchema = Joi.object().keys({
//   fullName: Joi.string().required(),
//   email: Joi.string().email().required(),
//   password: Joi.string().required().min(3),
// });

const onlyPostMethod = (req, res) =>
  res.status(200).json({ status: 200, message: "Only POST Method allowed" });

// const onlyPatchMethod = (req, res) =>
//   res.status(400).json({ status: 400, message: "Only Patch Method allowed" });

routes
  .route("/api/admin-register")
  .post(userController.createUser)
  .all(onlyPostMethod);

routes.route("/api/login").post(userController.userLogin).all(onlyPostMethod);

module.exports = routes;
