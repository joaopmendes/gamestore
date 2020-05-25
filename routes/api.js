const { Router } = require(`express`);
const passport = require("passport");
const routes = Router();
//! Controllers
const UserController = require("../Controllers/UserController");

// Authentication Routes
routes.get("/auth/google", passport.authenticate("google", { scope: "profile" }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
routes.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), function (
  req,
  res
) {
  res.redirect("/");
});
module.exports = routes;
