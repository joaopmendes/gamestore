const { Router } = require(`express`);
const ensureAuth = require("../Middlewares/ensureAuth");
const routes = Router();

//* User Router
routes.use("/users", require("./user"));
module.exports = routes;
