const { Router } = require(`express`);
const routes = Router();
const UserController = require("../Controllers/UserController");
const ensureAuth = require("../Middlewares/ensureAuth");
routes.post("/register", UserController.register);
routes.post("/login", UserController.login);
routes.get("/profile", ensureAuth, UserController.profile);

module.exports = routes;
