const { Router } = require(`express`);
const passport = require("passport");
const routes = Router();
//! Controllers
const UserController = require("../Controllers/UserController");

// Authentication Routes
routes.get(
  "/user",
  passport.authenticate("google", {
    session: false,
    successReturnToOrRedirect: "/",
    failureRedirect: "/login",
  }),
  UserController.profile
);
module.exports = routes;
